import { DefaultSeo } from "next-seo";

const config = {
	title: "Yuri Cunha",
	description:
		"Not just a DBA, but a data craftsman building digital legacies.",
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
		handle: "@isyuricunha",
		site: "@isyuricunha",
		cardType: "summary_large_image",
	},
};

export default function SEO() {
	return <DefaultSeo {...config} />;
}
