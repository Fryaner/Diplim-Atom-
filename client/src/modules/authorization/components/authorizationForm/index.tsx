import { NavLink } from "react-router-dom";
import { Button } from "../../../../UI/Button";
import { Input } from "../../../../UI/Input";
import { Label } from "../../../../UI/Label";

export const AuthorizationForm = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-[16px] max-md:px-[16px]">
            <h1 className="font-bold text-left" >Вход в кабинет покупателя</h1>
            <form className="flex flex-col w-[50%] gap-4 max-md:w-full">
                <div className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="username">Логин<span className="text-[red]">*</span></Label>
                        <Input type="text" id="username"></Input>
                    </div>
                    <div>
                        <Label htmlFor="password">Пароль<span className="text-[red]">*</span></Label>
                        <Input type="password" id="password"></Input>
                    </div>
                </div>
                <Button className="bg-[#8761D9]">Войти</Button>
            </form>
            <div className="flex gap-4">
                <NavLink to="../register" className="underline text-[#8761D9]">Нет аккаунта?</NavLink>
                {/* <NavLink to="" className="underline text-[#8761D9]">Забыли пароль?</NavLink> */}
            </div>
        </div>
    )
}