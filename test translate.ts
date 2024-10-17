const OPENAI_API_HOSTS = {
    "translate": "translate.google.com",
    "translate_api": "translate.googleapis.com",
    "translate_pa": "translate-pa.googleapis.com"
};

// 单独的函数来调用每个 API
async function callTranslateAPI(request) {
    return await fetch(`https://${OPENAI_API_HOSTS["translate"]}${request.url.pathname}`, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow",
    });
}

async function callTranslateAPIAPI(request) {
    return await fetch(`https://${OPENAI_API_HOSTS["translate_api"]}${request.url.pathname}`, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow",
    });
}

async function callTranslatePAPI(request) {
    return await fetch(`https://${OPENAI_API_HOSTS["translate_pa"]}${request.url.pathname}`, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow",
    });
}

Deno.serve(async (request) => {
    const url = new URL(request.url);
    const path = url.pathname.split('/')[1]; // 假设路径的第一个部分决定了使用哪个 API

    let response;
    // 根据路径选择相应的 API 调用
    switch (path) {
        case "translate":
            response = await callTranslateAPI(request);
            break;
        case "translate_api":
            response = await callTranslateAPIAPI(request);
            break;
        case "translate_pa":
            response = await callTranslatePAPI(request);
            break;
        default:
            response = await callTranslateAPI(request); // 默认使用 translate
            break;
    }

    return response;
});
