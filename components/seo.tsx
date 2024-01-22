import { DefaultSeo } from "next-seo";

const config = {
	title: "Yuri Cunha - Database Administrator",
	description: "I design & build database",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://beta.yuricunha.com",
		site_name: "Yuri Cunha",
		images: [
			{
				url: "https://beta.yuricunha.com/og.jpg",
				alt: "Yuri Cunha",
			},
		],
	},
	twitter: {
		handle: "@samuelkraft",
		site: "@samuelkraft",
		cardType: "summary_large_image",
	},
};

export default function SEO() {
	return <DefaultSeo {...config} />;
}
