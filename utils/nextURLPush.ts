import { NextRouter, useRouter } from "next/router";
export default function nextURLPush(router: NextRouter, url: string) {
  router.push(
    {
      pathname: url,
      query: { access: true },
    },
    url
  );
}
