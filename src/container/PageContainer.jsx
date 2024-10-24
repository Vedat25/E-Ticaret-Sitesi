import Container from '@mui/material/Container';

function pageContainer({ children }) {
	return (
		<Container maxWidth="lg">{children}</Container>
	)
}

export default pageContainer