import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="google-site-verification"
						content="RJQJipgMnyEfg3XESXsr7jXnVDOaAr1xtlCGRaoTQSo"
					/>
					<link
						rel="webmention"
						href="https://webmention.io/beta.yuricunha.com/webmention"
					/>
					<link
						rel="pingback"
						href="https://webmention.io/beta.yuricunha.com/xmlrpc"
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
