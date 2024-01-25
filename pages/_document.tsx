import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<meta name="google-site-verification" content="" />
					<link
						rel="webmention"
						href="https://webmention.io/yuricunha.com/webmention"
					/>
					<link
						rel="pingback"
						href="https://webmention.io/yuricunha.com/xmlrpc"
					/>
					<link href="https://github.com/isyuricunha" rel="me" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
