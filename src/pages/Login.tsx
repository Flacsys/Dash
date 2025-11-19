import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input.tsx";
import ActionButton from "../components/ActionButton.tsx";


const Login = () => {
    const navigate = useNavigate();
    const isLoading = false; // replace with real loading state

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            // Example redirect
            navigate("/dashboard");
        },
    });

    return (
        <div className="min-h-screen flex flex-col ">
            <div className="md:flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[360px] w-full space-y-8">
                    <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Email"
                                attributes={{
                                    type: "email",
                                    name: "email",
                                    placeholder: "Enter your email",
                                    value: formik.values.email,
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur,
                                }}
                                error={
                                    formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : undefined
                                }
                            />

                            <Input
                                passwordInput
                                label="Password"
                                attributes={{
                                    name: "password",
                                    placeholder: "Enter your password",
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
                                buttonText={isLoading ? "Signing in..." : "Sign in"}
                                loading={isLoading}
                                textSize="sm"
                                width="full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
