import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <NextScript
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G71ES07K2X"
        />
        <NextScript
          id={"google-analytics"}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag(js, new Date());
              gtag(config, G-G71ES07K2X);
            `,
          }}
        />
        <Head>
          <meta
            name="google-site-verification"
            content="S4VmR59DBZukGwBB_i8bTOHlK7rID0S6NlcH0x1hsCA"
          />
          <meta name="COPYRIGHT" content="Copyright (c) by Caak Holding LLC!" />
          <meta
            name="KEYWORDS"
            content="caak.mn, saak.mn, sak.mn, саак, sak, saak, entertainment, top, news, music, social, Mongolia, best, hot, Mongolian girls, Mongolian nature, Mongolian photo, Mongolian video, beauty, nice, cool, шилдэг, топ, сайхан, гоё, хамгийн, халуухан, дуртай, хобби, сонирхол, амьдрал, чөлөөт цаг, зөвлөгөө"
          />
          <meta name="description" content="caak.mn" />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }
            rel="stylesheet"
          />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
