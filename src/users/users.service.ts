import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashPassword = await hash(password, 10);
      createUserDto = { ...createUserDto, password: hashPassword };
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { correo, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { correo: correo.toLowerCase() },
        select: { correo: true, password: true },
      });
      if (!user) throw new UnauthorizedException('Credenciales invalidas');
      if (!compareSync(password, user.password)) {
        throw new UnauthorizedException('Credenciales invalidas');
      }
      delete user.password;
      return {
        user: user?.correo,
        token: this.getJwt({ correo: user?.correo }),
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { correo: email.toLocaleLowerCase() },
      });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
