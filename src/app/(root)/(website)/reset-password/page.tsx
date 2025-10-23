'use client'
import {useState} from "react";
import Spinner from "@/components/customs/spinner";
import {useTheme} from "@mui/material/styles";
import {Box, Button, IconButton, InputAdornment} from "@mui/material";
import Image from 'next/image'
import {WEBSITE_LOGIN} from "@/routes/WebsiteRoute";
import IconifyIcon from "@/components/customs/icons";
import {useRouter} from "next/navigation";
import {Control, Controller, useForm} from 'react-hook-form'
import CustomTextField from "@/components/customs/text-field";
import {zodResolver} from "@hookform/resolvers/zod";
import {zSchema} from "@/lib/zodSchema";
import { z } from "zod";

type TProps = {}

type TDefaultValue = {}

const ResetPassword = (props : TProps) => {
    // ** State
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //Hook
    const theme = useTheme()
    const router = useRouter()

    const formSchema = zSchema
        .pick({
            email: true,
        })
        .extend({
            password: z.string().min("3", "Password fields is required"),
        });

    const {
        handleSubmit,
        control,
        formState: { errors },
        setError, form
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    return (
        <>
            {isLoading && <Spinner/>}
            <Box sx={{ height: '100vh', width: '100vw',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex', alignItems: 'center', padding: '40px'
                }}>
                <Box
                    display={{ xs: 'none', sm: 'flex'}}
                    sx={{ alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.shape.borderRadius,
                        // backgroundColor: theme.palette.customColors.bodyBg,
                        height: '100%',
                        minWidth: '50vw'
                    }}>
                    <Image
                        src={theme.palette.mode === 'light' ? "" : ""}
                        alt='login image'
                        style={{
                            height: 'auto',
                            width: 'auto'
                        }}
                    />
                </Box>
                <form autoComplete='off' noValidate>
                    <Box sx={{ mt: 2, width: '300px' }}>
                        <CustomTextField
                            required
                            fullWidth
                            label={"Password"}
                            // onChange={onChange}
                            // onBlur={onBlur}
                            // value={value}
                            placeholder={"Enter_new_password"}
                            error={Boolean(errors?.newPassword)}
                            helperText={errors?.newPassword?.message}
                            type={showNewPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {showNewPassword ? (
                                                <IconifyIcon icon='material-symbols:visibility-outline' />
                                            ) : (
                                                <IconifyIcon icon='ic:outline-visibility-off' />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>

                    <Box sx={{ mt: 2, width: '300px' }}>
                        <CustomTextField
                            required
                            fullWidth
                            label={"Confirm_password"}
                            // onChange={onChange}
                            // onBlur={onBlur}
                            // value={value}
                            placeholder={'Enter_confirm_new_password'}
                            error={Boolean(errors?.confirmNewPassword)}
                            helperText={errors?.confirmNewPassword?.message}
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                            {showConfirmNewPassword ? (
                                                <IconifyIcon icon='material-symbols:visibility-outline' />
                                            ) : (
                                                <IconifyIcon icon='ic:outline-visibility-off' />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/*<Controller*/}
                        {/*    control={control}*/}
                        {/*    rules={{*/}
                        {/*        required: true*/}
                        {/*    }}*/}
                        {/*    render={({ field: { onChange, onBlur, value } }) => (*/}
                        {/*        */}
                        {/*    )}*/}
                        {/*    name='confirmNewPassword'*/}
                        {/*/>*/}
                    </Box>

                    <Box sx={{display: "flex", flexDirection: "column", gap: "8px", mt: "4px"}}>
                        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, width: "300px" }}>
                            {("Send_request")}
                        </Button>
                        <Button startIcon={<IconifyIcon icon="uiw:left"></IconifyIcon>} onClick={() => router.push(WEBSITE_LOGIN)} variant='outlined' sx={{ mt: 3, mb: 2, width: "300px" }}>
                            {"Back_login"}
                        </Button>
                    </Box>
                </form>

            </Box>
        </>
    )
}
export default ResetPassword;