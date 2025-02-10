interface MetaTagProps {
  title?: string;
  description?: string;
}

export function MetaData(props: MetaTagProps) {
  return (
    <>
        <title>{(props.title && `${props.title} | Iodine`) || "Iodine"}</title>
        <meta property="og:title" content={(props.title && `${props.title} | Iodine`) || "Iodine"} />
        <meta property="og:site_name" content="Iodine" />
        <meta name="description" content={props.description || "Iodine의 공식 웹페이지입니다."}/>
        <meta property="og:description" content={props.description || "Iodine의 공식 웹페이지입니다."} />
    </>
  );
}