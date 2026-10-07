// ==========================================
// ROBOT SI PENEBAK
// DETEKSI INFORMASI PERANGKAT
// ==========================================


async function detectDevice(){

    const input =
        document.getElementById("nameInput");

    const status =
        document.getElementById("status");

    const result =
        document.getElementById("result");

    const name =
        input.value.trim();


    if(!name){

        status.textContent =
            "⚠️ Masukkan nama Anda terlebih dahulu.";

        result.style.display =
            "none";

        return;
    }


    status.textContent =
        "🤖 Robot sedang menebak informasi HP Anda...";

    result.style.display =
        "none";


    const ua =
        navigator.userAgent || "";


    /* ======================================
       PERANGKAT
    ====================================== */

    let device =
        "Perangkat tidak diketahui";


    if(/OPPO/i.test(ua)){
        device = "OPPO";
    }

    else if(/Samsung/i.test(ua)){
        device = "Samsung";
    }

    else if(/Xiaomi|Redmi|POCO/i.test(ua)){
        device = "Xiaomi / Redmi / POCO";
    }

    else if(/vivo/i.test(ua)){
        device = "vivo";
    }

    else if(/realme/i.test(ua)){
        device = "realme";
    }

    else if(/OnePlus/i.test(ua)){
        device = "OnePlus";
    }

    else if(/Huawei/i.test(ua)){
        device = "Huawei";
    }

    else if(/HONOR/i.test(ua)){
        device = "HONOR";
    }

    else if(/iPhone/i.test(ua)){
        device = "iPhone";
    }

    else if(/iPad/i.test(ua)){
        device = "iPad";
    }

    else if(/Android/i.test(ua)){
        device = "Android";
    }


    /* ======================================
       PLATFORM
    ====================================== */

    const platform =
        navigator.platform ||
        "Tidak tersedia";


    /* ======================================
       SISTEM OPERASI
    ====================================== */

    let os =
        "Tidak diketahui";


    if(/Android/i.test(ua)){

        const match =
            ua.match(
                /Android\s([0-9.]+)/i
            );

        os =
            match
                ? "Android " + match[1]
                : "Android";
    }

    else if(/iPhone|iPad|iPod/i.test(ua)){

        os = "iOS / iPadOS";
    }

    else if(/Windows/i.test(ua)){

        os = "Windows";
    }

    else if(/Mac OS/i.test(ua)){

        os = "macOS";
    }

    else if(/Linux/i.test(ua)){

        os = "Linux";
    }


    /* ======================================
       BROWSER
    ====================================== */

    let browser =
        "Browser tidak diketahui";


    if(/Edg/i.test(ua)){

        browser = "Microsoft Edge";
    }

    else if(/OPR/i.test(ua)){

        browser = "Opera";
    }

    else if(/SamsungBrowser/i.test(ua)){

        browser = "Samsung Internet";
    }

    else if(/Chrome/i.test(ua)){

        browser = "Google Chrome";
    }

    else if(/Firefox/i.test(ua)){

        browser = "Mozilla Firefox";
    }

    else if(/Safari/i.test(ua)){

        browser = "Safari";
    }


    /* ======================================
       BAHASA
    ====================================== */

    const language =
        navigator.language ||
        "Tidak tersedia";


    const locale =
        navigator.languages
            ? navigator.languages.join(", ")
            : language;


    /* ======================================
       COOKIE
    ====================================== */

    const cookie =
        navigator.cookieEnabled
            ? "Aktif"
            : "Tidak aktif";


    /* ======================================
       SECURE
    ====================================== */

    const secure =
        window.isSecureContext
            ? "Ya"
            : "Tidak";


    /* ======================================
       RAM
    ====================================== */

    let ram =
        "Tidak tersedia";


    if(navigator.deviceMemory){

        ram =
            navigator.deviceMemory +
            " GB";
    }


    const memoryAPI =
        navigator.deviceMemory
            ? "Tersedia"
            : "Tidak tersedia";


    /* ======================================
       CPU
    ====================================== */

    let cpu =
        "Tidak tersedia";


    if(navigator.hardwareConcurrency){

        cpu =
            navigator.hardwareConcurrency +
            " logical core";
    }


    /* ======================================
       GPU / WEBGL
    ====================================== */

    let gpu =
        "Tidak tersedia";

    let webgl =
        "Tidak tersedia";


    try{

        const canvas =
            document.createElement("canvas");

        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext(
                "experimental-webgl"
            );


        if(gl){

            webgl =
                "Tersedia";

            const debugInfo =
                gl.getExtension(
                    "WEBGL_debug_renderer_info"
                );


            if(debugInfo){

                gpu =
                    gl.getParameter(
                        debugInfo.UNMASKED_RENDERER_WEBGL
                    );
            }
        }

    }

    catch(error){

        gpu =
            "Tidak tersedia";
    }


    /* ======================================
       LAYAR
    ====================================== */

    const screenInfo =
        screen.width +
        " × " +
        screen.height +
        " px";


    const viewport =
        window.innerWidth +
        " × " +
        window.innerHeight +
        " px";


    const pixelRatio =
        window.devicePixelRatio ||
        1;


    const colorDepth =
        screen.colorDepth
            ? screen.colorDepth +
              " bit"
            : "Tidak tersedia";


    let orientation =
        "Tidak tersedia";


    try{

        orientation =
            screen.orientation.type;

    }

    catch(error){

        orientation =
            window.innerWidth >
            window.innerHeight
                ? "landscape"
                : "portrait";
    }


    /* ======================================
       BATTERY
    ====================================== */

    let battery =
        "Tidak tersedia";

    let charging =
        "Tidak tersedia";


    try{

        if(navigator.getBattery){

            const batteryManager =
                await navigator.getBattery();


            battery =
                Math.round(
                    batteryManager.level * 100
                ) +
                "%";


            charging =
                batteryManager.charging
                    ? "Sedang mengisi ⚡"
                    : "Tidak mengisi";


        }

    }

    catch(error){

        battery =
            "Tidak tersedia";
    }


    /* ======================================
       NETWORK
    ====================================== */

    const online =
        navigator.onLine
            ? "Online 🟢"
            : "Offline 🔴";


    let connection =
        "Tidak tersedia";

    let downlink =
        "Tidak tersedia";

    let rtt =
        "Tidak tersedia";

    let saveData =
        "Tidak tersedia";


    const network =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;


    if(network){

        connection =
            network.effectiveType ||
            "Tersedia";


        if(network.downlink){

            downlink =
                network.downlink +
                " Mbps";
        }


        if(network.rtt){

            rtt =
                network.rtt +
                " ms";
        }


        saveData =
            network.saveData
                ? "Aktif"
                : "Tidak aktif";
    }


    /* ======================================
       TOUCH
    ====================================== */

    const touchPoints =
        navigator.maxTouchPoints || 0;


    const touch =
        touchPoints > 0
            ? touchPoints +
              " titik sentuh"
            : "Tidak tersedia";


    const touchSupport =
        touchPoints > 0
            ? "Didukung"
            : "Tidak terdeteksi";


    /* ======================================
       POINTER
    ====================================== */

    let pointer =
        "Tidak tersedia";


    try{

        if(
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ){

            pointer = "Touch / coarse";
        }

        else if(
            window.matchMedia(
                "(pointer: fine)"
            ).matches
        ){

            pointer = "Mouse / fine";
        }

        else{

            pointer = "Tidak diketahui";
        }

    }

    catch(error){}


    /* ======================================
       TIMEZONE
    ====================================== */

    let timezone =
        "Tidak diketahui";


    try{

        timezone =
            Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone;

    }

    catch(error){}


    /* ======================================
       LOCAL TIME
    ====================================== */

    let localTime =
        "Tidak tersedia";


    try{

        localTime =
            new Date()
            .toLocaleString(
                language,
                {
                    dateStyle:"medium",
                    timeStyle:"medium"
                }
            );

    }

    catch(error){

        localTime =
            new Date().toString();
    }


    /* ======================================
       STORAGE
    ====================================== */

    let storage =
        "Tidak tersedia";


    try{

        if(navigator.storage){

            storage =
                "Storage API tersedia";


            if(
                navigator.storage.estimate
            ){

                const estimate =
                    await navigator.storage
                    .estimate();


                if(
                    estimate.quota
                ){

                    const quotaGB =
                        (
                            estimate.quota /
                            1024 /
                            1024 /
                            1024
                        ).toFixed(2);


                    storage +=
                        " • Kuota sekitar " +
                        quotaGB +
                        " GB";
                }
            }
        }

    }

    catch(error){}


    const indexedDB =
        window.indexedDB
            ? "Didukung"
            : "Tidak didukung";


    /* ======================================
       HTTPS
    ====================================== */

    const https =
        location.protocol === "https:"
            ? "Ya 🔒"
            : "Tidak";


    /* ======================================
       REFERRER
    ====================================== */

    const referrer =
        document.referrer
            ? document.referrer
            : "Tidak tersedia";


    /* ======================================
       HASIL KE HTML
    ====================================== */

    document.getElementById(
        "resultName"
    ).textContent =
        name;


    document.getElementById(
        "device"
    ).textContent =
        device;


    document.getElementById(
        "platform"
    ).textContent =
        platform;


    document.getElementById(
        "os"
    ).textContent =
        os;


    document.getElementById(
        "userAgent"
    ).textContent =
        ua;


    document.getElementById(
        "browser"
    ).textContent =
        browser;


    document.getElementById(
        "language"
    ).textContent =
        language;


    document.getElementById(
        "locale"
    ).textContent =
        locale;


    document.getElementById(
        "cookie"
    ).textContent =
        cookie;


    document.getElementById(
        "secure"
    ).textContent =
        secure;


    document.getElementById(
        "ram"
    ).textContent =
        ram;


    document.getElementById(
        "cpu"
    ).textContent =
        cpu;


    document.getElementById(
        "gpu"
    ).textContent =
        gpu;


    document.getElementById(
        "memoryAPI"
    ).textContent =
        memoryAPI;


    document.getElementById(
        "screen"
    ).textContent =
        screenInfo;


    document.getElementById(
        "viewport"
    ).textContent =
        viewport;


    document.getElementById(
        "pixelRatio"
    ).textContent =
        pixelRatio;


    document.getElementById(
        "colorDepth"
    ).textContent =
        colorDepth;


    document.getElementById(
        "orientation"
    ).textContent =
        orientation;


    document.getElementById(
        "battery"
    ).textContent =
        battery;


    document.getElementById(
        "charging"
    ).textContent =
        charging;


    document.getElementById(
        "online"
    ).textContent =
        online;


    document.getElementById(
        "online2"
    ).textContent =
        online;


    document.getElementById(
        "connection"
    ).textContent =
        connection;


    document.getElementById(
        "downlink"
    ).textContent =
        downlink;


    document.getElementById(
        "rtt"
    ).textContent =
        rtt;


    document.getElementById(
        "saveData"
    ).textContent =
        saveData;


    document.getElementById(
        "touch"
    ).textContent =
        touch;


    document.getElementById(
        "touchSupport"
    ).textContent =
        touchSupport;


    document.getElementById(
        "pointer"
    ).textContent =
        pointer;


    document.getElementById(
        "timezone"
    ).textContent =
        timezone;


    document.getElementById(
        "localTime"
    ).textContent =
        localTime;


    document.getElementById(
        "storage"
    ).textContent =
        storage;


    document.getElementById(
        "indexedDB"
    ).textContent =
        indexedDB;


    document.getElementById(
        "https"
    ).textContent =
        https;


    document.getElementById(
        "webgl"
    ).textContent =
        webgl;


    document.getElementById(
        "referrer"
    ).textContent =
        referrer;


    /* ======================================
       LOKASI
       HANYA JIKA USER MEMBERI IZIN
    ====================================== */

    const locationElement =
        document.getElementById(
            "location"
        );


    if(navigator.geolocation){

        locationElement.textContent =
            "Meminta izin lokasi...";


        navigator.geolocation.getCurrentPosition(

            function(position){

                const latitude =
                    position.coords.latitude;


                const longitude =
                    position.coords.longitude;


                locationElement.textContent =
                    "Lat " +
                    latitude.toFixed(5) +
                    " • Long " +
                    longitude.toFixed(5);

            },

            function(){

                locationElement.textContent =
                    "Hanya developer yang Bisa Melihat";

            },

            {
                enableHighAccuracy:false,
                timeout:8000,
                maximumAge:60000
            }
        );

    }

    else{

        locationElement.textContent =
            "Browser tidak menampilkan lokasi";
    }


    /* ======================================
       TAMPILKAN HASIL
    ====================================== */

    result.style.display =
        "block";


    status.textContent =
        "✅ Robot selesai menebak informasi perangkat Anda.";

    
    result.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

}


/* ==========================================
   ENTER = TEBAK
========================================== */

document
    .getElementById("nameInput")
    .addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                detectDevice();

            }

        }
    );