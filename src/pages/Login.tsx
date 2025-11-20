import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input.tsx";
import ActionButton from "../components/ActionButton.tsx";
import { LuUser, LuLock, LuShield } from "react-icons/lu";

const Login = () => {
    const isLoading = false;

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-md">
                            <LuShield className="text-white text-2xl" />
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                        <p className="text-sm text-gray-600">Sign in to access the admin dashboard</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <Input
                            label="Username"
                            labelFor="username"
                            icon={<LuUser />}
                            attributes={{
                                type: "text",
                                name: "username",
                                placeholder: "Enter admin username",
                                value: formik.values.username,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.username && formik.errors.username
                                    ? formik.errors.username
                                    : undefined
                            }
                        />

                        <Input
                            passwordInput
                            label="Password"
                            labelFor="password"
                            icon={<LuLock />}
                            attributes={{
                                name: "password",
                                placeholder: "Enter admin password",
                                value: formik.values.password,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.password && formik.errors.password
                                    ? formik.errors.password
                                    : undefined
                            }
                        />

                        <ActionButton
                            attributes={{
                                type: "submit",
                                disabled: !formik.isValid || isLoading,
                            }}
                            buttonText={isLoading ? "Signing in..." : "Sign In"}
                            loading={isLoading}
                            width="full"
                            backgroundColor="#000000"
                            textColor="#ffffff"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
