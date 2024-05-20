import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../../../UI/Button";
import { Input } from "../../../../UI/Input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "../scheme";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../../../UI/Form/index";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAddUserMutation } from "../../api/registerApi";
import { Spinner } from "@radix-ui/themes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isSetAuth } from "../../../../store/authSlice";
import { UserModel } from "../../../../models/userModel";


export const RegisterForm = () => {
    const [addUser, {data, isLoading, isError}] = useAddUserMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          login: "",
          lastName: "",
          firstName: "",
          password: "",
          confirmPassword: "",
          patronymic: "",
          email: "",
          phone: "",
        },
      })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        addUser({
            firstName: values.firstName,
            lastName: values.lastName,
            patronymic: values.lastName,
            phone: values.phone,
            email: values.email,
            login: values.login,
            password: values.password,
        })
    }

    useEffect(() => {
        if (data?.accessToken) {
            dispatch(isSetAuth(true));
            const user: UserModel = {
                lastName: data.user.lastName,
                firstName: data.user.firstName,
                patronymic: data.user.patronymic,
                login: data.user.login,
                password: data.user.password,
                email: data.user.email,
                phone: data.user.phone,
                isActivated: data.user.isActivated,
                createdAt: data.user.createdAt,
            }
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', data.accessToken);
            navigate('/lc');
        }
    })

    return (
        <div className="flex flex-col items-center gap-2 py-[16px] max-md:px-[16px]">
            <h1 className="font-bold" >Регистрация</h1>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[50%] gap-4 max-md:w-full">
                <div className="flex flex-col gap-4">
                    <div>
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Фамилия<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Фамилия" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </div>
                    <div>
                    <div>
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Имя<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Имя" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </div>                 
                    </div>
                    <div>
                    <div>
                        <FormField
                        control={form.control}
                        name="patronymic"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Отчество<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Отчество" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </div>
                    </div>
                    <div>
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Логин<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Логин" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    </div>
                    <div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Номер телефона<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="tel" placeholder="Номер телефона" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />              
                    </div>
                    <div>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Электронный адрес<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Электронный адрес" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />  
                    </div>
                    <div>
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Пароль<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />  
                    </div>
                    <div>
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                        <FormItem>
                        <FormLabel>Подветрдите пароль<span className="text-[red]">*</span></FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Подтвердите пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />  
                    </div>
                </div>
                <Button className="bg-[#8761D9]">Зарегистрироваться</Button>
            </form>
            </Form>
            <div>
                <NavLink to="../auth" className="underline text-[#8761D9]">Уже есть аккаунт?</NavLink>
            </div>
            <div>
                {isLoading ? <Spinner/> : isError ? <p>Ошибка</p> : data?.message}
            </div>
        </div>
    )
}