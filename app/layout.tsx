import "./globals.css";
import "../node_modules/xterm/css/xterm.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "delightfulabyss.eth",
	description: "My personal website",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
