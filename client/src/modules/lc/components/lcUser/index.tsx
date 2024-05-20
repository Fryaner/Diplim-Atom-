import { UserModel } from "../../../../models/userModel";
import { Check, Pencil, X } from "lucide-react";
import { Input } from "../../../../UI/Input";
import { Button } from "../../../../UI/Button";

const LcUser = () => {
    const userJson = localStorage.getItem('user');
    const user: UserModel = userJson ? JSON.parse(userJson) : null;
    const dateUser = user.createdAt ? new Date(user.createdAt) : null;
    const dateCreateAccount = dateUser ? 
    `${dateUser.getDate().toString().padStart(2, '0')}.${(dateUser.getMonth() + 1).toString().padStart(2, '0')}.${dateUser.getFullYear()} ${dateUser.getHours().toString().padStart(2, '0')}:${dateUser.getMinutes().toString().padStart(2, '0')}` : null;
    return (
        <div className="flex flex-1 flex-col gap-4">
            {!user.isActivated ? <p className="w-full border p-8 bg-[red]/[70%] rounded">Вы не подтвердили электронную почту: {user.email}</p> : <></>}
            <h3 className="font-bold text-[24px]">Контактная информация</h3>
            <div className="flex flex-col gap-1">
                <p>Дата регистрации аккаунта: <span>{dateCreateAccount ? dateCreateAccount : <></>}</span></p>
            </div>
            <div className="flex flex-col gap-1">
                <p>Фамилия:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.lastName}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Имя:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.firstName}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Отчество:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.patronymic}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Номер телефона:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.phone}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <p>Электронная почта:</p>                
                    {user.isActivated ? <Check className="text-[green]"/> : <X className="text-[red]"/>}
                </div>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.email}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Логин:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.login}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p>Пароль:</p>
                <div className="flex">
                    <Input className="rounded-none rounded-l-lg" defaultValue={user.password}/>
                    <Button className="rounded-none rounded-r-lg"><Pencil/></Button>
                </div>
            </div>
        </div>
    )
}
export default LcUser;