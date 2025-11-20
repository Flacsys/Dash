import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LuUsers, LuPlus, LuUserX } from "react-icons/lu";
import Input from "../Input.tsx";
import Select from "../Select.tsx";
import ActionButton from "../ActionButton.tsx";

interface Participant {
    id: string;
    participantId: string;
    fullName: string;
    email: string;
    password: string;
    program: string;
    graduationYear: number;
    modulesCount: number;
}

const Participants = () => {
    const [participants, setParticipants] = useState<Participant[]>([
        {
            id: "1",
            participantId: "ST001",
            fullName: "John Smith",
            email: "john.smith@university.edu",
            password: "john123",
            program: "Computer Science",
            graduationYear: 2025,
            modulesCount: 5,
        },
        {
            id: "2",
            participantId: "ST002",
            fullName: "Emily Johnson",
            email: "emily.johnson@university.edu",
            password: "emily456",
            program: "Information Technology",
            graduationYear: 2026,
            modulesCount: 4,
        },
        {
            id: "3",
            participantId: "ST003",
            fullName: "Michael Brown",
            email: "michael.brown@university.edu",
            password: "mike789",
            program: "Data Science",
            graduationYear: 2025,
            modulesCount: 4,
        },
        {
            id: "4",
            participantId: "ST004",
            fullName: "Sarah Davis",
            email: "sarah.davis@university.edu",
            password: "sarah321",
            program: "Software Engineering",
            graduationYear: 2027,
            modulesCount: 4,
        },
    ]);

    const programs = [
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Software Engineering",
        "Business Administration",
    ];

    const graduationYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
    const semesters = ["1Qtr", "2Qtr", "3Qtr", "4Qtr"];

    const validationSchema = Yup.object({
        participantId: Yup.string()
            .required("Participant ID is required")
            .matches(/^[A-Z]{2}\d{3}$/, "Participant ID must be in format like PT005"),
        fullName: Yup.string()
            .required("Full Name is required")
            .min(3, "Full Name must be at least 3 characters"),
        email: Yup.string()
            .email("Please enter a valid email address"),
        password: Yup.string(),
        program: Yup.string()
            .required("Program is required"),
        graduationYear: Yup.string()
            .required("Graduation Year is required"),
        currentSemester: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            participantId: "",
            fullName: "",
            email: "",
            password: "",
            program: "",
            graduationYear: "",
            currentSemester: "1Qtr",
        },
        validationSchema,
        onSubmit: (values) => {
            // Auto-generate password if empty
            let generatedPassword = values.password;
            if (!generatedPassword) {
                const firstName = values.fullName.split(" ")[0].toLowerCase();
                const lastThreeDigits = values.participantId.slice(-3);
                generatedPassword = firstName + lastThreeDigits;
            }

            const newParticipant: Participant = {
                id: Date.now().toString(),
                participantId: values.participantId,
                fullName: values.fullName,
                email: values.email,
                password: generatedPassword,
                program: values.program,
                graduationYear: parseInt(values.graduationYear),
                modulesCount: 0,
            };
            setParticipants([...participants, newParticipant]);
            formik.resetForm();
            console.log("Participant added:", newParticipant);
        },
    });

    const handleDelete = (id: string) => {
        setParticipants(participants.filter((participant) => participant.id !== id));
        console.log("Participant deleted:", id);
    };

    return (
        <div className="space-y-6">
            {/* Current Participants Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <LuUsers className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                        Current Participants ({participants.length})
                    </h2>
                </div>

                <div className="space-y-3">
                    {participants.map((participant) => (
                        <div
                            key={participant.id}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900">{participant.fullName}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                    {participant.participantId} • {participant.program} • {participant.graduationYear}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">{participant.email}</p>
                                <p className="text-sm text-blue-600 underline cursor-pointer">
                                    Password: {participant.password}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                                    {participant.modulesCount} {participant.modulesCount === 1 ? "module" : "modules"}
                                </span>
                                <button
                                    onClick={() => handleDelete(participant.id)}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    aria-label="Remove participant"
                                >
                                    <LuUserX className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add New Participant Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Participant</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Participant ID *"
                            labelFor="participantId"
                            attributes={{
                                type: "text",
                                name: "participantId",
                                placeholder: "PT005",
                                value: formik.values.participantId,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.participantId && formik.errors.participantId
                                    ? formik.errors.participantId
                                    : undefined
                            }
                        />

                        <Input
                            label="Full Name *"
                            labelFor="fullName"
                            attributes={{
                                type: "text",
                                name: "fullName",
                                placeholder: "John Doe",
                                value: formik.values.fullName,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.fullName && formik.errors.fullName
                                    ? formik.errors.fullName
                                    : undefined
                            }
                        />

                        <Input
                            label="Email"
                            labelFor="email"
                            attributes={{
                                type: "email",
                                name: "email",
                                placeholder: "participant@university.edu",
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
                            label="Password (optional)"
                            labelFor="password"
                            passwordInput
                            attributes={{
                                name: "password",
                                placeholder: "Auto-generated if empty",
                                value: formik.values.password,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            note="Leave empty to auto-generate: firstname + last 3 digits of ID"
                        />

                        <Select
                            label="Program *"
                            labelFor="program"
                            attributes={{
                                name: "program",
                                value: formik.values.program,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.program && formik.errors.program
                                    ? formik.errors.program
                                    : undefined
                            }
                        >
                            <option value="">Select program</option>
                            {programs.map((program) => (
                                <option key={program} value={program}>
                                    {program}
                                </option>
                            ))}
                        </Select>

                        <Select
                            label="Graduation Year *"
                            labelFor="graduationYear"
                            attributes={{
                                name: "graduationYear",
                                value: formik.values.graduationYear,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                            error={
                                formik.touched.graduationYear && formik.errors.graduationYear
                                    ? formik.errors.graduationYear
                                    : undefined
                            }
                        >
                            <option value="">Select graduation year</option>
                            {graduationYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Select>

                        <Select
                            label="Current Semester"
                            labelFor="currentSemester"
                            attributes={{
                                name: "currentSemester",
                                value: formik.values.currentSemester,
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                            }}
                        >
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="pt-2">
                        <ActionButton
                            buttonText={
                                <span className="flex items-center gap-2">
                                    <LuPlus className="h-4 w-4" />
                                    Add Participant
                                </span>
                            }
                            attributes={{
                                type: "submit",
                                disabled: !formik.isValid,
                            }}
                            width="full"
                            paddingX="px-4"
                            backgroundColor="#000000"
                            textColor="#ffffff"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Participants;
