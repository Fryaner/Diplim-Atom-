import { NavLink } from "react-router-dom";
import { Button } from "../../../../UI/Button";
import { Input } from "../../../../UI/Input";
import { Label } from "../../../../UI/Label";

export const RegisterForm = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-[16px] max-md:px-[16px]">
            <h1 className="font-bold" >Регистрация</h1>
            <form className="flex flex-col w-[50%] gap-4 max-md:w-full">
                <div className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="lastName">Фамилия<span className="text-[red]">*</span></Label>
                        <Input  type="text" id="lastName"></Input>
                    </div>
                    <div>
                        <Label htmlFor="firstName">Имя<span className="text-[red]">*</span></Label>
                        <Input type="text" id="firstName"></Input>                    
                    </div>
                    <div>
                        <Label htmlFor="patronymic">Отчество<span className="text-[red]">*</span></Label>
                        <Input type="text" id="patronymic"></Input>
                    </div>
                    <div>
                        <Label htmlFor="username">Логин<span className="text-[red]">*</span></Label>
                        <Input type="text" id="username"></Input>
                    </div>
                    <div>
                        <Label htmlFor="phone">Номер телефона<span className="text-[red]">*</span></Label>
                        <Input type="tel" id="phone"></Input>                   
                    </div>
                    <div>
                        <Label htmlFor="email">Электронный адрес<span className="text-[red]">*</span></Label>
                        <Input type="email" id="email"></Input>
                    </div>
                    <div>
                        <Label htmlFor="password">Пароль<span className="text-[red]">*</span></Label>
                        <Input type="password" id="password"></Input>
                    </div>
                    <div>
                        <Label htmlFor="repeatPassword">Повторите пароль<span className="text-[red]">*</span></Label>
                        <Input type="password" id="repeatPassword"></Input>
                    </div>
                </div>
                <Button className="bg-[#8761D9]">Зарегистрироваться</Button>
            </form>
            <div>
                <NavLink to="../auth" className="underline text-[#8761D9]">Уже есть аккаунт?</NavLink>
            </div>
        </div>
    )
}