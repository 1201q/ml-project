import { NextRouter, useRouter } from "next/router";
export default function nextURLPush(
  router: NextRouter,
  url: string,
  replace?: boolean
) {
  if (!replace) {
    router.push(
      {
        pathname: url,
        query: { access: true },
      },
      url
    );
  } else {
    router.replace(
      {
        pathname: url,
        query: { access: true },
      },
      url
    );
  }
}
