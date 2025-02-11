interface MetaTagProps {
  title?: string;
  description?: string;
}

export function MetaData(props: MetaTagProps) {
  const title = `${props.title} | ${process.env.SITE_NAME}`
  return (
    <>
        <title>{(props.title && title) || process.env.SITE_NAME}</title>
        <meta property="og:title" content={(props.title && title) || process.env.SITE_NAME} />
        <meta property="og:site_name" content={process.env.SITE_NAME} />
        <meta name="description" content={props.description || process.env.SITE_DESC}/>
        <meta property="og:description" content={props.description || process.env.SITE_DESC} />
    </>
  );
}