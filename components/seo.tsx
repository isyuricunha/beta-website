import { DefaultSeo } from "next-seo";

const config = {
	title: "Yuri Cunha - Design engineer",
	description: "I design & build database",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://samuelkraft.com",
		site_name: "Yuri Cunha",
		images: [
			{
				url: "https://samuelkraft.com/og.jpg",
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
