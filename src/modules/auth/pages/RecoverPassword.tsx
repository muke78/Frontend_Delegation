import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	FieldDescription,
	FieldSet,
	FieldGroup,
	Field,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/styles/Icons";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const RecoverPassword = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [verifyCode, setVerifyCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [_showCodeButton, setShowCodeButton] = useState(true);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [attempts, setAttempts] = useState(3);
	const [error, setError] = useState("");
	const [passwordValidation, setPasswordValidation] = useState({
		minLength: false,
		hasUpperCase: false,
		hasLowerCase: false,
		hasNumber: false,
		hasSpecialChar: false,
	});

	// Calcular progreso basado en el paso actual
	const progress = ((step - 1) / 3) * 100;

	// Timer para reenvío de código
	useEffect(() => {
		let timer: ReturnType<typeof setInterval>;
		if (timeRemaining > 0) {
			timer = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [timeRemaining]);

	// Formatear tiempo restante
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	// Validación de email
	const isValidEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	// Validación de contraseña en tiempo real
	useEffect(() => {
		setPasswordValidation({
			minLength: newPassword.length >= 6,
			hasUpperCase: /[A-Z]/.test(newPassword),
			hasLowerCase: /[a-z]/.test(newPassword),
			hasNumber: /[0-9]/.test(newPassword),
			hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		});
	}, [newPassword]);

	const isPasswordValid = Object.values(passwordValidation).every(Boolean);

	// Enviar código al correo
	const handleSendCode = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!isValidEmail(email)) {
			setError("Por favor ingresa un correo electrónico válido");
			return;
		}

		// Simular envío de código
		setShowCodeButton(false);
		setTimeRemaining(180); // 3 minutos
		setStep(2);
	};

	// Reenviar código
	const handleResendCode = () => {
		if (timeRemaining === 0) {
			setShowCodeButton(false);
			setTimeRemaining(180);
			setError("");
			// Aquí iría la lógica para reenviar el código
		}
	};

	// Verificar código
	const handleVerifyCode = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (verifyCode.length !== 6) {
			setError("El código debe tener 6 dígitos");
			return;
		}

		// Simular verificación de código
		const isCodeCorrect = verifyCode === "123456"; // Mock

		if (isCodeCorrect) {
			setStep(3);
			setError("");
		} else {
			setAttempts((prev) => prev - 1);
			if (attempts - 1 <= 0) {
				setError(
					"Has agotado tus intentos. Por favor solicita un nuevo código.",
				);
				setVerifyCode("");
				setAttempts(3);
				setStep(1);
			} else {
				setError(`Código incorrecto. Te quedan ${attempts - 1} intentos.`);
				setVerifyCode("");
			}
		}
	};

	// Cambiar contraseña
	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!isPasswordValid) {
			setError("La contraseña no cumple con todos los requisitos");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		// Aquí iría la lógica para cambiar la contraseña
		alert("¡Contraseña cambiada exitosamente!");
		// Redireccionar al login o dashboard
		navigate("/login");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-primary/5 p-4">
			<div className="w-full max-w-md">
				{/* Barra de progreso */}
				<div className="mb-8">
					<div className="flex justify-between text-sm mb-2">
						<span>Paso {step} de 3</span>
						<span>{Math.round(progress)}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>

				{/* Tarjeta principal */}
				<div className="bg-background rounded-lg shadow-lg p-8">
					{/* Paso 1: Verificación de correo */}
					{step === 1 && (
						<form onSubmit={handleSendCode} className="space-y-6">
							<div className="text-center mb-6">
								<div className="inline-flex items-center justify-center bg-primary/20 w-16 h-16 rounded-full mb-4">
									<Icons.Mail className="w-8 h-8 text-primary" />
								</div>
								<h2 className="text-2xl font-bold">Verificación de correo</h2>
								<p className="mt-2 text-sm">
									Ingresa la cuenta de correo con la que te registraste. Te
									enviaremos un código de verificación.
								</p>
							</div>

							{error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<FieldSet>
								<Field>
									<FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
									<div className="relative">
										<Icons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
										<Input
											id="email"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="tu@ejemplo.com"
											className="pl-10"
											required
											aria-describedby="email-description"
										/>
									</div>
									<FieldDescription id="email-description">
										Revisa tu bandeja de spam si no recibes el correo
									</FieldDescription>
								</Field>
							</FieldSet>

							<Button
								type="submit"
								size={"default"}
								className="w-full text-base font-medium cursor-pointer"
							>
								Enviar código
							</Button>
						</form>
					)}

					{/* Paso 2: Verificación de código */}
					{step === 2 && (
						<form onSubmit={handleVerifyCode} className="space-y-6">
							<div className="text-center mb-6">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
									<Icons.ShieldCheck className="w-8 h-8 text-primary" />
								</div>
								<h2 className="text-2xl font-bold">Verificación de código</h2>
								<p className="mt-2 text-sm">
									Ingresa el código de 6 dígitos que enviamos a{" "}
									<span className="font-semibold">{email}</span>
								</p>
							</div>

							{error && (
								<Alert variant={"destructive"}>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							{attempts < 3 && !error.includes("agotado") && (
								<Alert>
									<AlertDescription>
										Intentos restantes: {attempts}
									</AlertDescription>
								</Alert>
							)}

							<FieldSet>
								<Field>
									<FieldLabel htmlFor="code">Código de verificación</FieldLabel>
									<div className="flex justify-center">
										<InputOTP
											maxLength={6}
											value={verifyCode}
											onChange={setVerifyCode}
											size={80}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</div>
									<FieldDescription className="text-center mt-4">
										{timeRemaining > 0 ? (
											<span>
												Podrás solicitar un nuevo código en{" "}
												<span className="font-bold">
													{formatTime(timeRemaining)}
												</span>
											</span>
										) : (
											<Button
												type="button"
												variant="link"
												onClick={handleResendCode}
												size={"default"}
												className="w-full text-base font-medium cursor-pointer"
											>
												Reenviar código
											</Button>
										)}
									</FieldDescription>
								</Field>
							</FieldSet>

							<Button
								type="submit"
								size={"default"}
								className="w-full text-base font-medium cursor-pointer"
								disabled={verifyCode.length !== 6}
							>
								Verificar código
							</Button>
						</form>
					)}

					{/* Paso 3: Nueva contraseña */}
					{step === 3 && (
						<form onSubmit={handleChangePassword} className="space-y-6">
							<div className="text-center mb-6">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
									<Icons.Lock className="w-8 h-8 text-primary" />
								</div>
								<h2 className="text-2xl font-bold">Nueva contraseña</h2>
								<p className="mt-2 text-sm">
									Crea una contraseña segura y fácil de recordar
								</p>
							</div>

							{error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<FieldSet>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="new-password">
											Nueva contraseña
										</FieldLabel>
										<div className="relative">
											<Icons.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
											<Input
												id="new-password"
												type={showPassword ? "text" : "password"}
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												placeholder="••••••••"
												className="pl-10"
												required
											/>
										</div>
									</Field>

									<Field>
										<FieldLabel htmlFor="confirm-password">
											Confirmar contraseña
										</FieldLabel>
										<div className="relative">
											<Icons.Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
											<Input
												id="confirm-password"
												type={showPassword ? "text" : "password"}
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												placeholder="••••••••"
												className="pl-10"
												required
											/>
										</div>
									</Field>

									<div className="flex justify-start gap-2">
										<Checkbox
											id="show-password"
											onClick={() => setShowPassword(!showPassword)}
										/>
										<Label htmlFor="show-password">Mostrar constraseñas</Label>
									</div>
								</FieldGroup>

								<div className="rounded-lg bg-muted p-4 space-y-2">
									<p className="text-sm font-semibold mb-3">
										La contraseña debe contener:
									</p>
									<ValidationItem
										isValid={passwordValidation.minLength}
										text="Mínimo 6 caracteres"
									/>
									<ValidationItem
										isValid={passwordValidation.hasUpperCase}
										text="Una letra mayúscula"
									/>
									<ValidationItem
										isValid={passwordValidation.hasLowerCase}
										text="Una letra minúscula"
									/>
									<ValidationItem
										isValid={passwordValidation.hasNumber}
										text="Un número"
									/>
									<ValidationItem
										isValid={passwordValidation.hasSpecialChar}
										text="Un carácter especial (!@#$%^&*)"
									/>
								</div>
							</FieldSet>

							<Button
								type="submit"
								disabled={!isPasswordValid || newPassword !== confirmPassword}
								size={"default"}
								className="w-full text-base font-medium cursor-pointer"
							>
								Cambiar contraseña
							</Button>
						</form>
					)}
				</div>

				{/* Footer */}
				<div className="text-center mt-6">
					<Button
						variant={"link"}
						onClick={() => {
							if (step > 1) {
								setStep((prev) => prev - 1);
								setError("");
							}
						}}
						disabled={step === 1}
						className="cursor-pointer text-black dark:text-white"
					>
						<Icons.ArrowLeft className="w-4 h-4 mr-2" />
						Volver
					</Button>
				</div>
			</div>
		</div>
	);
};

// Componente para validación visual
const ValidationItem = ({
	isValid,
	text,
}: {
	isValid: boolean;
	text: string;
}) => (
	<div className="flex items-center gap-2">
		{isValid ? (
			<Icons.CircleCheck className="w-4 h-4 text-green-600 shrink-0" />
		) : (
			<Icons.Circle className="w-4 h-4 text-slate-300 shrink-0" />
		)}
		<span className={`text-sm ${isValid ? "text-green-600" : "text-rose-500"}`}>
			{text}
		</span>
	</div>
);
