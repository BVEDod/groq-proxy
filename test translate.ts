const OPENAI_API_HOSTS = {
    "translate": "translate.google.com",
    "translate_api": "translate.googleapis.com",
    "translate_pa": "translate-pa.googleapis.com"
};

Deno.serve(async (request) => {
    const url = new URL(request.url);
    const path = url.pathname.split('/')[1]; // 假设路径的第一个部分决定了使用哪个 API

    // 根据路径选择 API 主机
    const selectedHost = OPENAI_API_HOSTS[path] || OPENAI_API_HOSTS["translate"]; // 默认使用 translate.google.com

    url.host = selectedHost;

    const newRequest = new Request(url.toString(), {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow",
    });
    return await fetch(newRequest);
});
