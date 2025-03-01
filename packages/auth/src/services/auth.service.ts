import { Types } from "mongoose";
import { Config } from "../config/config";
import { LoginDto } from "../dto/login.dto";
import { SignupDto } from "../dto/signup.dto";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { publishUserCreated } from "../messaging/rabbitmq.publisher";
import { AuthError } from "../errors/auth.error";
import { ErrorType } from "../constants/errorTypes";

class AuthService {
  async login(payload: LoginDto): Promise<string> {
    const { email, password } = payload;

    const user = await this._getUserByEmail(email);

    if (!user) {
      throw new AuthError(ErrorType.InvalidCredentials, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AuthError(ErrorType.InvalidCredentials, 401);
    }

    return this._signJWT(user._id);
  }

  async signup(payload: SignupDto): Promise<string> {
    const { email, password, firstName, lastName } = payload;

    const existingUser = await this._getUserByEmail(email);

    if (existingUser) {
      throw new AuthError(ErrorType.EmailInUse, 409);
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await newUser.save();

    await publishUserCreated(newUser._id.toString());

    return this._signJWT(newUser._id);
  }

  private async _getUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  private _signJWT(userId: Types.ObjectId): string {
    const token = jwt.sign({ id: userId }, Config.jwt_secret!, {
      expiresIn: "1h",
    });

    return token;
  }
}

export { AuthService };
