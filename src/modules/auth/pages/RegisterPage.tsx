import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/styles/Icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4">
			<div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />

			<form className="relative w-full max-w-md">
				<div className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border rounded-2xl shadow-2xl p-8 space-y-6">
					<div className="flex flex-col items-center text-center space-y-2">
						<div className="p-3 bg-primary/10 rounded-full">
							<Icons.FileText size={32} className="text-primary" />
						</div>
						<FieldSet>
							<FieldLegend className="text-2xl font-bold tracking-tight">
								Registrate
							</FieldLegend>
							<FieldDescription className="text-sm text-muted-foreground">
								Crea una nueva cuenta para entrar al sistema
							</FieldDescription>
						</FieldSet>
					</div>

					<FieldGroup>
						<Field>
							<FieldLabel
								htmlFor="username_register"
								className="text-sm font-medium"
							>
								Nombre de usuario
							</FieldLabel>
							<div className="relative">
								<Icons.User2
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								/>
								<Input
									id="username_register"
									type="text"
									placeholder="JohnDoe11"
									className="pl-10"
									required
								/>
							</div>
						</Field>

						<Field>
							<FieldLabel
								htmlFor="name_register"
								className="text-sm font-medium"
							>
								Nombre completo
							</FieldLabel>
							<div className="relative">
								<Icons.User2
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								/>
								<Input
									id="name_register"
									type="text"
									placeholder="John Doe Fort Dux"
									className="pl-10"
									required
								/>
							</div>
						</Field>

						<Field>
							<FieldLabel
								htmlFor="email_register"
								className="text-sm font-medium"
							>
								Correo electrónico
							</FieldLabel>
							<div className="relative">
								<Icons.Mail
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								/>
								<Input
									id="email_register"
									type="email"
									placeholder="tu@ejemplo.com"
									className="pl-10"
									required
								/>
							</div>
						</Field>

						<Field>
							<FieldLabel
								htmlFor="password_register"
								className="text-sm font-medium"
							>
								Contraseña
							</FieldLabel>
							<div className="relative">
								<Icons.Lock
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
								/>
								<Input
									id="password_register"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									className="pl-10"
									required
								/>
							</div>
						</Field>

						<div className="flex justify-between">
							<div className="flex justify-center items-center gap-2">
								<Checkbox
									id="show-password"
									onClick={() => setShowPassword(!showPassword)}
								/>
								<Label htmlFor="show-password">Mostrar contraseña</Label>
							</div>
							<div>
								<Link to="/login">
									<Button variant={"link"} className="cursor-pointer">
										¿Ya tienes cuenta?
									</Button>
								</Link>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full h-11 text-base font-medium cursor-pointer"
						>
							Crear cuenta
						</Button>
					</FieldGroup>
					<p className="text-sm font-medium text-muted-foreground text-center">
						<span className="text-destructive">*</span>
						Automáticamente serás redirigido a la página de inicio de sesión al
						crear tu cuenta.
					</p>
				</div>
			</form>
		</div>
	);
};
