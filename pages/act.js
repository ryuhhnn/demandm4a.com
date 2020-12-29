import { fetchCMS } from "../lib/cms";
import { markdownToHtml } from "../lib/helpers";
import ReactHtmlParser from "react-html-parser";
import "../styles/Act.module.scss";

export default function Act({ data, errors }) {
  if (errors) {
    return (
      <>
        {errors.map((error) => (
          <span>{error}</span>
        ))}
      </>
    );
  }

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.call_to_action}</p>
      <div>
        {data.actions.map((action) => (
          <div>
            <h2>{action.title}</h2>
            {ReactHtmlParser(action.body)}
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetchCMS("/act");
  const actions = [];

  if (data.errors) {
    return {
      props: {
        errors: data.errors,
      },
    };
  }

  await Promise.all(
    data.actions.map(async (action) => {
      const body = await markdownToHtml(action.body);
      actions.push({
        ...action,
        body,
      });
    })
  );

  return {
    props: {
      data: {
        ...data,
        actions: [...actions],
      },
    },
  };
}
