import { CssBaseline } from '@mui/material';
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1877f2',
			dark: '#0a66c2',
			light: '#e7f3ff',
		},
		secondary: {
			main: '#65676b',
		},
		background: {
			default: '#fff',
			paper: '#f0f2f5',
		},
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Helvetica',
			'Arial',
			'sans-serif',
		].join(','),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 600,
				},
			},
		},
	},
});

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
