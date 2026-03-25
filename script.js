"use strict";

const SUPABASE_URL = "https://eubfyyhgslcgxarbwsop.supabase.co";
const SUPABASE_KEY = "sb_publishable_88nDUwzhWNUW5pdrPbxCAA_KTkXtmT9";
const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CATALOGO_SERVICIOS = {
  netflix: {
    nombre: "Netflix",
    color: "#E50914",
    svg: "M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
  },
  spotify: {
    nombre: "Spotify",
    color: "#1DB954",
    svg: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
  },
  youtube: {
    nombre: "YouTube",
    color: "#FF0000",
    svg: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  },
  "disney+": {
    nombre: "Disney+",
    color: "#113CCF",
    svg: "TEXTO:D+"
  },
  hbo: {
    nombre: "HBO Max",
    color: "#000000",
    svg: "M7.042 16.896H4.414v-3.754H2.708v3.754H.01L0 7.22h2.708v3.6h1.706v-3.6h2.628zm12.043.046C21.795 16.94 24 14.689 24 11.978a4.89 4.89 0 0 0-4.915-4.92c-2.707-.002-4.09 1.991-4.432 2.795.003-1.207-1.187-2.632-2.58-2.634H7.59v9.674l4.181.001c1.686 0 2.886-1.46 2.888-2.713.385.788 1.72 2.762 4.427 2.76zm-7.665-3.936c.387 0 .692.382.692.817 0 .435-.305.817-.692.817h-1.33v-1.634zm.005-3.633c.387 0 .692.382.692.817 0 .436-.305.818-.692.818h-1.33V9.373zm1.77 2.607c.305-.039.813-.387.992-.61-.063.276-.068 1.074.006 1.35-.204-.314-.688-.701-.998-.74zm3.43 0a2.462 2.462 0 1 1 4.924 0 2.462 2.462 0 0 1-4.925 0zm2.462 1.936a1.936 1.936 0 1 0 0-3.872 1.936 1.936 0 0 0 0 3.872Z"
  },
  "amazon prime video": {
    nombre: "Amazon Prime Video",
    color: "#00A8E1",
    svg: "M.002 19.43v-1.92c1.181 1.443 2.976 2.365 4.985 2.365l.35-.001c1.61-.027 3.076-.646 4.191-1.648.555.764 1.456 1.26 2.473 1.26 1.023 0 1.928-.502 2.483-1.273 1.142 1.033 2.657 1.662 4.316 1.662l.294-.001c1.985-.038 3.749-.976 4.905-2.422v1.98c0 2.522-2.043 4.568-4.567 4.568H4.569C2.045 23.998.002 21.954.002 19.43z"
  },
  "apple tv": {
    nombre: "Apple TV",
    color: "#000000",
    svg: "M20.57 17.735h-1.815l-3.34-9.203h1.633l2.02 5.987c.075.231.273.9.586 2.012l.297-.997.33-1.006 2.094-6.004H24zm-5.344-.066a5.76 5.76 0 0 1-1.55.207c-1.23 0-1.84-.693-1.84-2.087V9.646h-1.063V8.532h1.121V7.081l1.476-.602v2.062h1.707v1.113H13.38v5.805c0 .446.074.75.214.932.14.182.396.264.75.264.207 0 .495-.041.883-.115zm-7.29-5.343c.017 1.764 1.55 2.358 1.567 2.366-.017.042-.248.842-.808 1.658-.487.71-.99 1.418-1.79 1.435-.783.016-1.03-.462-1.93-.462-.89 0-1.17.445-1.913.478-.758.025-1.344-.775-1.838-1.484-.998-1.451-1.765-4.098-.734-5.88.51-.89 1.426-1.451 2.416-1.46.75-.016 1.468.512 1.93.512.461 0 1.327-.627 2.234-.536.38.016 1.452.157 2.136 1.154-.058.033-1.278.743-1.27 2.219M6.468 7.988c.404-.495.685-1.18.61-1.864-.585.025-1.294.388-1.723.883-.38.437-.71 1.138-.619 1.806.652.05 1.328-.338 1.732-.825Z"
  },
  twitch: {
    nombre: "Twitch",
    color: "#9146FF",
    svg: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
  },
  crunchyroll: {
    nombre: "Crunchyroll",
    color: "#F47521",
    svg: "M2.909 13.436C2.914 7.61 7.642 2.893 13.468 2.898c5.576.005 10.137 4.339 10.51 9.819q.021-.351.022-.706C24.007 5.385 18.64.006 12.012 0S.007 5.36 0 11.988 5.36 23.994 11.988 24q.412 0 .815-.027c-5.526-.338-9.9-4.928-9.894-10.538Zm16.284.155a4.1 4.1 0 0 1-4.095-4.103 4.1 4.1 0 0 1 2.712-3.855 8.95 8.95 0 0 0-4.187-1.037 9.007 9.007 0 1 0 8.997 9.016q-.001-.847-.15-1.651a4.1 4.1 0 0 1-3.278 1.63Z"
  },
  steam: {
    nombre: "Steam",
    color: "#000000",
    svg: "M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"
  },
  playstation: {
    nombre: "PlayStation",
    color: "#003791",
    svg: "M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.39-1.502zm4.656 16.241l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5V14.98l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.03 5.437.661 1.848.601 2.04 1.472 1.576 2.072-.465.6-1.622 1.036-1.622 1.036l-8.544 3.107V18.86zM1.807 18.6c-1.9-.545-2.214-1.668-1.352-2.32.801-.586 2.16-1.052 2.16-1.052l5.615-2.013v2.313L4.205 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.247 17v2.074c-.12.03-.256.044-.39.073-1.939.331-3.996.196-6.038-.479z"
  },
  xbox: {
    nombre: "Xbox",
    color: "#107C10",
    svg: "M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.082-.042-.063-.022-.152-.045-.281-.045-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042C1.365 5.642 0 8.664 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245-.131 0-.223.021-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z"
  },
  "adobe creative cloud": {
    nombre: "Adobe Creative Cloud",
    color: "#DA1F26",
    svg: "M14.782 3.153c-.231.02-.472.04-.703.07a8.453 8.453 0 0 0-2.832.834 8.951 8.951 0 0 0-2.46 1.777c-.03.04-.09.06-.141.05a7.44 7.44 0 0 0-1.496-.07 7.424 7.424 0 0 0-2.932.763c-1.768.884-3.013 2.26-3.736 4.108a7.089 7.089 0 0 0-.462 2.139c0 .05-.01.09-.02.13v.773c.02.201.05.392.07.593.1.813.332 1.596.703 2.33.824 1.646 2.089 2.851 3.786 3.594a7.127 7.127 0 0 0 2.45.593c.032 0 .06.004.086.01h8.576c.183-.017.362-.035.547-.06a8.344 8.344 0 0 0 2.811-.834 8.836 8.836 0 0 0 3.646-3.304 8.187 8.187 0 0 0 1.184-3.093c.05-.34.08-.692.121-1.034 0-.05.01-.09.02-.13v-.794c-.02-.23-.05-.452-.05-.662a8.345 8.345 0 0 0-.834-2.812 8.952 8.952 0 0 0-3.324-3.645 8.245 8.245 0 0 0-3.072-1.175c-.362-.06-.713-.09-1.075-.13-.05 0-.09-.01-.14-.02z"
  },
  "microsoft 365": {
    nombre: "Microsoft 365",
    color: "#D83B01",
    svg: "TEXTO:M"
  },
  "google one": {
    nombre: "Google One",
    color: "#4285F4",
    svg: "TEXTO:G"
  },
  dropbox: {
    nombre: "Dropbox",
    color: "#0061FF",
    svg: "M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"
  },
  icloud: {
    nombre: "iCloud",
    color: "#3693F3",
    svg: "TEXTO:iC"
  },
  github: {
    nombre: "GitHub",
    color: "#181717",
    svg: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  },
  notion: {
    nombre: "Notion",
    color: "#000000",
    svg: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
  },
  slack: {
    nombre: "Slack",
    color: "#4A154B",
    svg: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
  },
  canva: {
    nombre: "Canva",
    color: "#00C4CC",
    svg: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"
  },
  duolingo: {
    nombre: "Duolingo",
    color: "#58CC02",
    svg: "M14.484 18.213c1.142 1.033 2.657 1.662 4.316 1.662l.294-.001c1.985-.038 3.749-.976 4.905-2.422v1.98c0 2.522-2.043 4.568-4.567 4.568H4.569C2.045 23.998.002 21.954.002 19.43v-1.92c1.181 1.443 2.976 2.365 4.985 2.365l.35-.001c1.61-.027 3.076-.646 4.191-1.648.555.764 1.456 1.26 2.473 1.26 1.023 0 1.928-.502 2.483-1.273zm-5.349-.996c-.989 1.022-2.375 1.658-3.909 1.658h-.239c-2.229 0-4.146-1.343-4.987-3.262v-7.16c.281-.64.68-1.216 1.169-1.699-.035-.731.132-1.469.511-2.128.256-.44.867-.504 1.21-.124l.766.851c.007-.003.014-.003.021-.005-.098-.78.037-1.587.419-2.308.24-.45.757-.53 1.114-.164 0 0 3.939 3.979 4.035 4.084 1.542 1.348 4.066 1.287 5.686-.18.002-.003.007-.005.009-.007.042-.042 3.855-3.9 3.855-3.9.336-.345.862-.31 1.113.164.385.724.518 1.535.417 2.32l.004.002.007.002.003.001.776-.86c.342-.38.954-.316 1.207.124.387.673.553 1.427.509 2.173.496.501.897 1.099 1.169 1.762v6.941c-.816 1.978-2.761 3.373-5.032 3.373H18.8c-1.547 0-2.945-.648-3.936-1.686a.839.839 0 0 0-.009-.067c.313-.017.528-.162.688-.33.152-.16.299-.397.299-.776 0 0-.022-.312-.024-.324.693.767 1.696 1.249 2.811 1.249 2.092 0 3.787-1.696 3.787-3.787v-2.243c0-2.092-1.697-3.787-3.787-3.787-2.093 0-3.787 1.695-3.787 3.787v2.243c0 .266.027.526.079.776-.712-.784-1.744-1.278-2.842-1.278-1.239 0-2.339.523-3.064 1.355.063-.274.097-.56.097-.853v-2.243c0-2.092-1.697-3.787-3.788-3.787-2.09 0-3.787 1.695-3.787 3.787v2.243c0 2.093 1.697 3.787 3.787 3.787 1.151 0 2.182-.513 2.876-1.322-.008.035-.039.395-.039.395 0 .378.147.616.298.775.16.168.374.312.688.331a.778.778 0 0 0-.012.097zm.997.073c.729.131 1.733.305 1.792.305h.157c.059 0 1.789-.303 1.789-.303-.327.705-1.041 1.194-1.869 1.194-.829 0-1.543-.49-1.869-1.196zm-.971-1.379c.246-1.313 1.462-2.259 2.918-2.259 1.324 0 2.521.97 2.763 2.259v.105c0 .082-.029.115-.103.106l-2.658.473h-.157l-2.66-.476c-.075.01-.103-.023-.103-.105zm8.023-6.392c.255-.14.549-.22.861-.22.992 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.542c.034.003.068.005.103.005.64 0 1.16-.518 1.16-1.156 0-.312-.125-.596-.327-.804zM5.162 9.461c.227-.104.48-.162.746-.162.991 0 1.798.804 1.798 1.798v1.919c0 .991-.804 1.797-1.798 1.797-.991 0-1.797-.803-1.797-1.797v-1.571c.089.022.182.034.278.034.641 0 1.16-.518 1.16-1.156 0-.342-.149-.65-.387-.862zM.002 6.554V4.568C.002 2.044 2.045 0 4.569 0h14.865c2.522 0 4.565 2.044 4.565 4.568v2.041a5.185 5.185 0 0 0-.164-.197 4.859 4.859 0 0 0-.646-2.284c-.433-.754-1.315-1.037-2.07-.786a4.785 4.785 0 0 0-.327-.774c-.287-.54-.758-.835-1.248-.908-.493-.073-1.033.072-1.464.515l-3.82 3.864c-1.226 1.11-3.127 1.199-4.313.205-.103-.109-4.025-4.071-4.025-4.071-.427-.438-.966-.584-1.46-.51-.489.073-.961.367-1.248.907v.002c-.133.25-.241.508-.327.771-.753-.252-1.635.029-2.071.782 0 0-.001.001-.001.002-.4.694-.613 1.459-.645 2.23-.057.065-.113.13-.167.197z"
  },
  chatgpt: {
    nombre: "ChatGPT",
    color: "#10A37F",
    svg: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z"
  }
};

const MONEDAS = {
  COP: { simbolo: "CO$", nombre: "Peso colombiano" },
  USD: { simbolo: "US$", nombre: "Dólar estadounidense" },
  EUR: { simbolo: "€", nombre: "Euro" },
  ARS: { simbolo: "AR$", nombre: "Peso argentino" },
  MXN: { simbolo: "MX$", nombre: "Peso mexicano" },
  BRL: { simbolo: "R$", nombre: "Real brasileño" },
  CLP: { simbolo: "CL$", nombre: "Peso chileno" },
  PEN: { simbolo: "S/", nombre: "Sol peruano" },
  GBP: { simbolo: "£", nombre: "Libra esterlina" },
};

function buscarServicio(nombre) {
  if (!nombre) return null;
  const normalizado = nombre.toLowerCase().replace(/[^a-z0-9+]/g, "");
  for (const [clave, datos] of Object.entries(CATALOGO_SERVICIOS)) {
    const claveNorm = clave.toLowerCase().replace(/[^a-z0-9+]/g, "");
    const nombreNorm = datos.nombre.toLowerCase().replace(/[^a-z0-9+]/g, "");
    if (claveNorm === normalizado || nombreNorm === normalizado) return datos;
  }
  for (const [clave, datos] of Object.entries(CATALOGO_SERVICIOS)) {
    const claveNorm = clave.toLowerCase().replace(/[^a-z0-9+]/g, "");
    const nombreNorm = datos.nombre.toLowerCase().replace(/[^a-z0-9+]/g, "");
    if (claveNorm.includes(normalizado) || nombreNorm.includes(normalizado) ||
        normalizado.includes(claveNorm) || normalizado.includes(nombreNorm)) {
      return datos;
    }
  }
  return null;
}

function _hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 55%, 45%)`;
}

function renderLogo(nombre, size = 32) {
  const servicio = buscarServicio(nombre);
  if (servicio) {
    if (servicio.svg.startsWith("TEXTO:")) {
      const texto = servicio.svg.replace("TEXTO:", "");
      const fontSize = size * 0.45;
      return `<span class="service-logo" style="width:${size}px;height:${size}px;"><svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="${servicio.color}"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-weight="700" font-size="${fontSize <= 10 ? 11 : 10}" font-family="system-ui,sans-serif">${texto}</text></svg></span>`;
    }
    return `<span class="service-logo" style="width:${size}px;height:${size}px;"><svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${servicio.color}" xmlns="http://www.w3.org/2000/svg"><path d="${servicio.svg}"/></svg></span>`;
  }
  const inicial = (nombre || "?").charAt(0).toUpperCase();
  const color = _hashColor(nombre || "");
  return `<span class="service-logo service-logo-placeholder" style="width:${size}px;height:${size}px;background:${color};font-size:${size * 0.45}px;">${inicial}</span>`;
}

/* ============================================================
 *  GESTOR DE SUSCRIPCIONES DIGITALES
 *  Arquitectura: POO pura — sin frameworks ni librerías externas.
 *
 *  Clases:
 *    - Suscripcion      → modelo de datos + cálculos de una suscripción
 *    - AppManager       → lógica de negocio: auth, CRUD, cálculos, filtros
 *    - UI               → manipulación del DOM y enlace de eventos
 * ============================================================ */

/* ============================================================
 *  CLASE: Suscripcion
 *  Encapsula los datos de un servicio digital y los cálculos
 *  de gasto asociados.
 * ============================================================ */
class Suscripcion {
  /**
   * @param {object} datos
   * @param {string} [datos.id]           - UUID interno; se auto-genera si no se provee
   * @param {string}  datos.nombre        - Nombre del servicio (ej. "Netflix")
   * @param {string}  datos.categoria     - Categoría (ej. "Entretenimiento")
   * @param {number}  datos.costoMensual  - Importe mensual en $
   * @param {string}  datos.fechaCobro    - Fecha completa de cobro en formato YYYY-MM-DD
   * @param {string} [datos.estado]       - "activa" | "cancelada"  (default: "activa")
   * @param {string} [datos.creadaEn]     - ISO timestamp de creación
   */
  constructor({
    id,
    nombre,
    categoria,
    costo,
    costoMensual,
    fechaCobro,
    estado,
    ciclo,
    moneda,
    creadaEn,
  } = {}) {
    this.id =
      id || `s_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.nombre = nombre;
    this.categoria = categoria;
    this.costo = parseFloat(costo || costoMensual) || 0;
    this.fechaCobro = fechaCobro; // YYYY-MM-DD
    this.estado = estado || "activa";
    this.ciclo = ciclo || "mensual";
    this.moneda = moneda || "USD";
    this.creadaEn = creadaEn || new Date().toISOString();
  }

  /* -------- Cálculos -------- */

  getCostoMensual() {
    switch (this.ciclo) {
      case "semanal":     return this.costo * 4.33;
      case "mensual":     return this.costo;
      case "trimestral":  return this.costo / 3;
      case "semestral":   return this.costo / 6;
      case "anual":       return this.costo / 12;
      default:            return this.costo;
    }
  }

  getCostoAnual() {
    return this.getCostoMensual() * 12;
  }

  /**
   * Indica si la suscripción está en estado activo.
   * @returns {boolean}
   */
  estaActiva() {
    return this.estado === "activa";
  }

  /**
   * Detecta un posible cobro no deseado: la suscripción fue marcada
   * como "cancelada" en el sistema, pero la fecha de cobro registrada
   * es hoy o posterior (el cargo aún no ha pasado).
   * Esto sirve de alerta en el dashboard para que el usuario verifique
   * si la cancelación fue efectiva con el proveedor.
   * @returns {boolean}
   */
  tieneCobroPendiente() {
    if (this.estaActiva()) return false;
    // Comparar fechas ignorando la hora para evitar falsos negativos
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    // Forzar hora 00:00 local sumando 'T00:00:00' para que no haya
    // desfase por zona horaria al parsear la cadena YYYY-MM-DD
    const fechaCobro = new Date(this.fechaCobro + "T00:00:00");
    return fechaCobro >= hoy;
  }

  /* -------- Serialización -------- */

  /** Serializa la instancia a objeto plano para JSON.stringify */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      costo: this.costo,
      fechaCobro: this.fechaCobro,
      estado: this.estado,
      ciclo: this.ciclo,
      moneda: this.moneda,
      creadaEn: this.creadaEn,
    };
  }

  /**
   * Reconstruye una Suscripcion desde un objeto plano (reversión de toJSON).
   * @param   {object}      obj
   * @returns {Suscripcion}
   */
  static fromJSON(obj) {
    return new Suscripcion(obj);
  }
}

/* ============================================================
 *  CLASE: AppManager
 *  Contiene toda la lógica de negocio: autenticación, CRUD de
 *  suscripciones, cálculos del dashboard, filtros y persistencia
 *  exclusiva en LocalStorage.
 *
 *  Estructura de claves en LocalStorage:
 *    "gsub_users"         → Array<{username, password, creadoEn}>
 *    "gsub_session"       → string (username del usuario logueado)
 *    "gsub_data_<user>"   → Array<Suscripcion.toJSON()>
 * ============================================================ */
class AppManager {
  constructor() {
    this.usuarioActual = null;
    this.suscripciones = [];
  }

  async registrar(email, password) {
    if (!email.trim() || !password.trim()) {
      return { ok: false, mensaje: "Email y contraseña son obligatorios." };
    }
    if (password.trim().length < 6) {
      return { ok: false, mensaje: "La contraseña debe tener al menos 6 caracteres." };
    }
    const { data, error } = await sbClient.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });
    if (error) {
      if (error.message.includes("already registered") || error.message.includes("already been registered")) {
        return { ok: false, mensaje: "Este correo ya tiene una cuenta registrada." };
      }
      return { ok: false, mensaje: error.message };
    }
    if (data?.user?.identities?.length === 0) {
      return { ok: false, mensaje: "Este correo ya tiene una cuenta registrada." };
    }
    return { ok: true, mensaje: "Registro exitoso. Confirmá tu cuenta en el correo." };
  }

  async login(email, password) {
    if (!email.trim() || !password.trim()) {
      return { ok: false, mensaje: "Completá todos los campos." };
    }
    const { data, error } = await sbClient.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });
    if (error) {
      return { ok: false, mensaje: "Email o contraseña incorrectos." };
    }
    this.usuarioActual = data.user;
    await this._cargarSuscripciones();
    return { ok: true, mensaje: "Bienvenido." };
  }

  async logout() {
    await sbClient.auth.signOut();
    this.usuarioActual = null;
    this.suscripciones = [];
  }

  async restaurarSesion() {
    const { data: { session } } = await sbClient.auth.getSession();
    if (!session) return false;
    this.usuarioActual = session.user;
    await this._cargarSuscripciones();
    return true;
  }

  async _cargarSuscripciones() {
    const { data, error } = await sbClient
      .from("suscripciones")
      .select("*")
      .eq("user_id", this.usuarioActual.id);
    if (error) {
      this.suscripciones = [];
      return;
    }
    this.suscripciones = data.map(row => new Suscripcion({
      id: row.id,
      nombre: row.nombre,
      categoria: row.categoria,
      costo: row.costo,
      moneda: row.moneda,
      ciclo: row.ciclo,
      fechaCobro: row.fecha_cobro,
      estado: row.estado,
      creadaEn: row.created_at,
    }));
  }

  async agregarSuscripcion(datos) {
    const { data, error } = await sbClient.from("suscripciones").insert({
      user_id: this.usuarioActual.id,
      nombre: datos.nombre,
      categoria: datos.categoria,
      costo: parseFloat(datos.costo) || 0,
      moneda: datos.moneda || "COP",
      ciclo: datos.ciclo || "mensual",
      fecha_cobro: datos.fechaCobro,
      estado: datos.estado || "activa",
    }).select().single();
    if (!error && data) {
      const nueva = new Suscripcion({
        id: data.id,
        nombre: data.nombre,
        categoria: data.categoria,
        costo: data.costo,
        moneda: data.moneda,
        ciclo: data.ciclo,
        fechaCobro: data.fecha_cobro,
        estado: data.estado,
        creadaEn: data.created_at,
      });
      this.suscripciones.push(nueva);
      return nueva;
    }
    return null;
  }

  async editarSuscripcion(id, datos) {
    const { error } = await sbClient.from("suscripciones").update({
      nombre: datos.nombre,
      categoria: datos.categoria,
      costo: parseFloat(datos.costo) || 0,
      moneda: datos.moneda || "COP",
      ciclo: datos.ciclo || "mensual",
      fecha_cobro: datos.fechaCobro,
      estado: datos.estado,
    }).eq("id", id);
    if (error) return false;
    const idx = this.suscripciones.findIndex(s => s.id === id);
    if (idx !== -1) {
      const original = this.suscripciones[idx];
      this.suscripciones[idx] = new Suscripcion({
        ...original.toJSON(),
        ...datos,
        id: original.id,
        creadaEn: original.creadaEn,
      });
    }
    return true;
  }

  async eliminarSuscripcion(id) {
    const { error } = await sbClient.from("suscripciones").delete().eq("id", id);
    if (error) return false;
    const idx = this.suscripciones.findIndex(s => s.id === id);
    if (idx !== -1) this.suscripciones.splice(idx, 1);
    return true;
  }

  /**
   * Busca y retorna una Suscripcion por ID.
   * @param   {string}          id
   * @returns {Suscripcion|null}
   */
  getSuscripcion(id) {
    return this.suscripciones.find((s) => s.id === id) || null;
  }

  /* ============================================================
   *  SECCIÓN: Cálculos del Dashboard
   * ============================================================ */

  /**
   * Cuenta las suscripciones en estado "activa".
   * @returns {number}
   */
  getTotalActivas() {
    return this.suscripciones.filter((s) => s.estaActiva()).length;
  }

  /**
   * Suma el costoMensual de todas las suscripciones activas.
   * @returns {number}
   */
  getGastoMensualTotal() {
    return this.suscripciones
      .filter((s) => s.estaActiva())
      .reduce((acc, s) => acc + s.getCostoMensual(), 0);
  }

  /**
   * Proyecta el gasto anual: gasto mensual × 12.
   * Asume que la cartera de suscripciones activas se mantiene constante.
   * @returns {number}
   */
  getGastoAnualProyectado() {
    return this.getGastoMensualTotal() * 12;
  }

  /**
   * Retorna las suscripciones "canceladas" que aún tienen
   * una fecha de cobro futura o igual a hoy.
   * Son una alerta: el usuario las marcó como canceladas en la app
   * pero el proveedor podría cobrarlas de todas formas.
   * @returns {Suscripcion[]}
   */
  getGastoMensualPorMoneda() {
    const gastos = {};
    this.suscripciones
      .filter(s => s.estaActiva())
      .forEach(s => {
        if (!gastos[s.moneda]) gastos[s.moneda] = 0;
        gastos[s.moneda] += s.getCostoMensual();
      });
    return gastos;
  }

  getServiciosInactivos() {
    return this.suscripciones.filter((s) => s.tieneCobroPendiente());
  }

  /**
   * Retorna suscripciones activas cuya fecha de cobro está dentro
   * de los próximos `dias` días (incluyendo hoy).
   * @param   {number}        dias
   * @returns {Suscripcion[]}
   */
  getSuscripcionesProximas(dias) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const limite = new Date(hoy);
    limite.setDate(limite.getDate() + dias);
    limite.setHours(23, 59, 59, 999);

    return this.suscripciones.filter((s) => {
      if (!s.estaActiva() || !s.fechaCobro) return false;
      const fecha = new Date(s.fechaCobro + "T00:00:00");
      return fecha >= hoy && fecha <= limite;
    });
  }

  /* ============================================================
   *  SECCIÓN: Filtros
   * ============================================================ */

  /**
   * Filtra la lista completa combinando categoría y estado.
   * Si alguno de los parámetros viene vacío (''), no filtra por ese eje.
   *
   * @param   {string}        categoria  - '' = todas
   * @param   {string}        estado     - '' = todos
   * @returns {Suscripcion[]}
   */
  filtrarCombinado(categoria, estado) {
    return this.suscripciones.filter((s) => {
      const matchCat = !categoria || s.categoria === categoria;
      const matchEst = !estado || s.estado === estado;
      return matchCat && matchEst;
    });
  }

  /**
   * Retorna un Map donde las claves son días del mes (1-31) y los valores
   * son arrays de Suscripcion activas cuya fechaCobro cae en ese día.
   * @param   {number} anio - Año (ej. 2026)
   * @param   {number} mes  - Mes 0-indexed (0=Enero, 11=Diciembre)
   * @returns {Map<number, Suscripcion[]>}
   */
  getSuscripcionesPorDia(anio, mes) {
    const mapa = new Map();
    this.suscripciones
      .filter(s => s.estaActiva() && s.fechaCobro)
      .forEach(s => {
        const fecha = new Date(s.fechaCobro + "T00:00:00");
        if (fecha.getFullYear() === anio && fecha.getMonth() === mes) {
          const dia = fecha.getDate();
          if (!mapa.has(dia)) mapa.set(dia, []);
          mapa.get(dia).push(s);
        }
      });
    return mapa;
  }
}

/* ============================================================
 *  CLASE: UI
 *  Responsable de toda la interacción con el DOM:
 *    - Controla qué vista se muestra (auth vs. app)
 *    - Renderiza el dashboard, la tabla y el modal
 *    - Enlaza los event listeners de formularios, botones y filtros
 *    - Se comunica con AppManager para ejecutar la lógica de negocio
 * ============================================================ */
class UI {
  /**
   * @param {AppManager} appManager
   */
  constructor(appManager) {
    this.app = appManager;
    /** ID de la suscripción en edición; null en modo "crear" */
    this.editandoId = null;

    /** Estado del calendario: mes y año actuales */
    this.calMes = new Date().getMonth();
    this.calAnio = new Date().getFullYear();

    // Cachear referencias al DOM usadas frecuentemente
    this.vistaAuth = document.getElementById("vista-auth");
    this.vistaApp = document.getElementById("vista-app");
    this.modalOverlay = document.getElementById("modal-overlay");
    this.formAuth = document.getElementById("form-auth");
    this.formSub = document.getElementById("form-suscripcion");
    this.tablaWrapper = document.getElementById("tabla-wrapper");
  }

  /* ============================================================
   *  Punto de entrada
   * ============================================================ */

  /**
   * Inicializa la aplicación:
   *  1. Enlaza todos los event listeners.
   *  2. Si hay sesión guardada, muestra la app directamente.
   *     Si no, muestra el formulario de autenticación.
   */
  async init() {
    this._bindEventos();

    if (await this.app.restaurarSesion()) {
      this._mostrarVistaApp();
    } else {
      this._mostrarVistaAuth();
    }
  }

  /* ============================================================
   *  Control de vistas
   * ============================================================ */

  /** Activa la vista de autenticación y resetea el formulario */
  _mostrarVistaAuth() {
    this.vistaAuth.classList.remove("hidden");
    this.vistaApp.classList.add("hidden");
    this.formAuth.reset();
    this._limpiarError();
  }

  /** Activa la vista principal de la app y renderiza los datos */
  _mostrarVistaApp() {
    this.vistaAuth.classList.add("hidden");
    this.vistaApp.classList.remove("hidden");
    document.getElementById("header-username").textContent =
      `Bienvenido, ${this.app.usuarioActual.email}`;

    // Restaurar config de días guardada
    const diasGuardados = this._getConfigDias();
    document.getElementById("config-dias-aviso").value = String(diasGuardados);

    // Actualizar estado visual del botón de notificaciones
    this._actualizarEstadoBtnNotif();

    this._actualizarVista();

    // Auto-verificar cobros próximos si ya tenemos permiso
    if ("Notification" in window && Notification.permission === "granted") {
      this._verificarCobrosProximos();
    }
  }

  /* ============================================================
   *  Renderizado del Dashboard
   * ============================================================ */

  /**
   * Actualiza los 4 indicadores de la sección Dashboard.
   * Se llama después de cualquier cambio en las suscripciones.
   */
  renderDashboard() {
    document.getElementById("stat-activas").textContent =
      this.app.getTotalActivas();

    const gastosPorMoneda = this.app.getGastoMensualPorMoneda();
    const monedas = Object.keys(gastosPorMoneda);
    const esMulti = monedas.length > 1;

    const statMensual = document.getElementById("stat-mensual");
    const statAnual = document.getElementById("stat-anual");

    if (monedas.length === 0) {
      statMensual.textContent = this._formatCurrency(0);
      statMensual.classList.remove("stat-multi");
      statAnual.textContent = this._formatCurrency(0);
      statAnual.classList.remove("stat-multi");
    } else if (!esMulti) {
      const moneda = monedas[0];
      statMensual.textContent = this._formatCurrency(gastosPorMoneda[moneda], moneda);
      statMensual.classList.remove("stat-multi");
      statAnual.textContent = this._formatCurrency(gastosPorMoneda[moneda] * 12, moneda);
      statAnual.classList.remove("stat-multi");
    } else {
      statMensual.innerHTML = monedas.map(m => this._formatCurrency(gastosPorMoneda[m], m)).join("<br>");
      statMensual.classList.add("stat-multi");
      statAnual.innerHTML = monedas.map(m => this._formatCurrency(gastosPorMoneda[m] * 12, m)).join("<br>");
      statAnual.classList.add("stat-multi");
    }

    const inactivos = this.app.getServiciosInactivos();
    document.getElementById("stat-inactivos").textContent = inactivos.length;

    const cardAlerta = document.querySelector(".card-alerta");
    cardAlerta.classList.toggle("card-alerta--activa", inactivos.length > 0);
  }

  /* ============================================================
   *  Renderizado de la Tabla
   * ============================================================ */

  /**
   * Renderiza la lista de suscripciones en el DOM.
   * Si la lista está vacía, muestra el estado vacío con mensaje de ayuda.
   * @param {Suscripcion[]} lista
   */
  renderTabla(lista) {
    if (lista.length === 0) {
      this.tablaWrapper.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📭</span>
                    <p>No hay suscripciones para mostrar.</p>
                    <small>Haz clic en "+ Nueva Suscripción" para comenzar.</small>
                </div>`;
      return;
    }

    // Construir filas con data-label para la tabla responsive en móvil
    const filas = lista
      .map(
        (s) => `
            <tr>
                <td data-label="Nombre" class="celda-nombre">
                    ${renderLogo(s.nombre)}
                    <strong>${this._escapeHTML(s.nombre)}</strong>
                </td>
                <td data-label="Categoría">
                    <span class="badge badge-categoria">${this._escapeHTML(s.categoria)}</span>
                </td>
                <td data-label="Costo/Mes" class="text-right">
                    ${this._formatCurrency(s.getCostoMensual(), s.moneda)} <span class="badge badge-ciclo">${s.ciclo}</span>
                </td>
                <td data-label="Costo/Año" class="text-right">
                    ${this._formatCurrency(s.getCostoAnual(), s.moneda)}
                </td>
                <td data-label="Próximo Cobro">
                    ${this._formatDate(s.fechaCobro)}
                    ${
                      s.tieneCobroPendiente()
                        ? `<span class="badge-alerta" title="Cancelada con cobro pendiente">⚠️</span>`
                        : ""
                    }
                </td>
                <td data-label="Estado">
                    <span class="badge badge-estado badge-estado--${s.estado}">
                        ${s.estado === "activa" ? "● Activa" : "○ Cancelada"}
                    </span>
                </td>
                <td data-label="Acciones" class="acciones">
                    <button class="btn-accion btn-editar"   data-id="${s.id}" title="Editar">✏</button>
                    <button class="btn-accion btn-eliminar" data-id="${s.id}" title="Eliminar">🗑</button>
                </td>
            </tr>
        `,
      )
      .join("");

    this.tablaWrapper.innerHTML = `
            <div class="table-responsive">
                <table class="tabla-suscripciones" aria-label="Lista de suscripciones">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th class="text-right">Costo/Mes</th>
                            <th class="text-right">Costo/Año</th>
                            <th>Próximo Cobro</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;

    // Enlazar botones de acción generados dinámicamente
    this.tablaWrapper
      .querySelectorAll(".btn-editar")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this._abrirModalEditar(btn.dataset.id),
        ),
      );
    this.tablaWrapper
      .querySelectorAll(".btn-eliminar")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this._confirmarEliminar(btn.dataset.id),
        ),
      );
  }

  /* ============================================================
   *  Modal CRUD
   * ============================================================ */

  /** Abre el modal en modo "Crear nueva suscripción" */
  _abrirModalCrear() {
    this.editandoId = null;
    document.getElementById("modal-title").textContent = "Nueva Suscripción";
    this.formSub.reset();
    this._limpiarLogoPreview();
    document.getElementById("sub-moneda").value = "COP";
    document.getElementById("sub-ciclo").value = "mensual";
    document.querySelector('input[name="sub-estado"][value="activa"]').checked =
      true;
    this.modalOverlay.classList.remove("hidden");
    // Llevar el foco al primer campo para accesibilidad
    document.getElementById("sub-nombre").focus();
  }

  /**
   * Abre el modal en modo "Editar" precargando los datos de la suscripción.
   * @param {string} id - ID de la suscripción a editar
   */
  _abrirModalEditar(id) {
    const sub = this.app.getSuscripcion(id);
    if (!sub) return;

    this.editandoId = id;
    document.getElementById("modal-title").textContent = "Editar Suscripción";

    document.getElementById("sub-nombre").value = sub.nombre;
    document.getElementById("sub-categoria").value = sub.categoria;
    document.getElementById("sub-costo").value = sub.costo;
    document.getElementById("sub-moneda").value = sub.moneda;
    document.getElementById("sub-ciclo").value = sub.ciclo;
    document.getElementById("sub-fecha").value = sub.fechaCobro;

    document.querySelector(
      `input[name="sub-estado"][value="${sub.estado}"]`,
    ).checked = true;

    this._actualizarLogoPreview(sub.nombre);
    this.modalOverlay.classList.remove("hidden");
    document.getElementById("sub-nombre").focus();
  }

  /** Cierra el modal y limpia el estado de edición */
  _cerrarModal() {
    this.modalOverlay.classList.add("hidden");
    this.editandoId = null;
    this.formSub.reset();
    this._limpiarLogoPreview();
  }

  _actualizarLogoPreview(nombre) {
    const preview = document.getElementById("logo-preview");
    if (nombre && nombre.trim().length >= 2) {
      preview.innerHTML = renderLogo(nombre, 48);
      preview.classList.add("logo-preview--visible");
    } else {
      this._limpiarLogoPreview();
    }
  }

  _limpiarLogoPreview() {
    const preview = document.getElementById("logo-preview");
    preview.innerHTML = "";
    preview.classList.remove("logo-preview--visible");
  }

  /* ============================================================
   *  Flujo de actualización centralizado
   * ============================================================ */

  /**
   * Lee los filtros activos, obtiene la lista filtrada de AppManager
   * y re-renderiza tanto el dashboard como la tabla.
   * Se invoca tras cualquier cambio de datos o de filtros.
   */
  _actualizarVista() {
    const cat = document.getElementById("filtro-categoria").value;
    const est = document.getElementById("filtro-estado").value;
    const orden = document.getElementById("filtro-orden").value;
    const lista = this.app.filtrarCombinado(cat, est);

    // Ordenar la lista según la opción seleccionada
    if (orden) {
      lista.sort((a, b) => {
        switch (orden) {
          case "nombre":
            return a.nombre.localeCompare(b.nombre, "es");
          case "categoria":
            return a.categoria.localeCompare(b.categoria, "es");
          case "costo-mayor":
            return b.getCostoMensual() - a.getCostoMensual();
          case "costo-menor":
            return a.getCostoMensual() - b.getCostoMensual();
          case "cobro":
            return (a.fechaCobro || "9999-12-31").localeCompare(b.fechaCobro || "9999-12-31");
          default:
            return 0;
        }
      });
    }

    this.renderDashboard(); // siempre sobre el total, no sobre la lista filtrada
    this.renderTabla(lista);
    this.renderCalendario();
  }

  /* ============================================================
   *  Renderizado del Calendario de Cobros
   * ============================================================ */

  /**
   * Renderiza el calendario mensual mostrando las suscripciones activas
   * en los días que corresponden a su fecha de cobro.
   */
  renderCalendario() {
    const MESES = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Actualizar título
    const titulo = document.getElementById("cal-mes-titulo");
    if (titulo) titulo.textContent = `${MESES[this.calMes]} ${this.calAnio}`;

    // Obtener suscripciones por día
    const subsPorDia = this.app.getSuscripcionesPorDia(this.calAnio, this.calMes);

    // Calcular estructura del mes
    const primerDia = new Date(this.calAnio, this.calMes, 1);
    const diasEnMes = new Date(this.calAnio, this.calMes + 1, 0).getDate();
    // Convertir: JS getDay() 0=Dom → Monday-first: (getDay()+6)%7 → Lun=0, Dom=6
    const offsetInicio = (primerDia.getDay() + 6) % 7;

    // Fecha de hoy para marcar el día actual
    const hoy = new Date();
    const esHoyMes = hoy.getMonth() === this.calMes && hoy.getFullYear() === this.calAnio;
    const diaHoy = hoy.getDate();

    const cuerpo = document.getElementById("cal-cuerpo");
    if (!cuerpo) return;
    cuerpo.innerHTML = "";

    // Celdas vacías antes del primer día
    for (let i = 0; i < offsetInicio; i++) {
      const vacio = document.createElement("div");
      vacio.className = "cal-dia-vacio";
      cuerpo.appendChild(vacio);
    }

    // Celdas para cada día del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const celda = document.createElement("div");
      celda.className = "cal-dia";

      if (esHoyMes && dia === diaHoy) celda.classList.add("cal-hoy");

      const subs = subsPorDia.get(dia);
      if (subs && subs.length > 0) celda.classList.add("cal-con-cobro");

      // Número del día
      const numero = document.createElement("div");
      numero.className = "cal-dia-numero";
      numero.textContent = dia;
      celda.appendChild(numero);

      // Chips de suscripciones
      if (subs && subs.length > 0) {
        subs.forEach(s => {
          const chip = document.createElement("div");
          chip.className = "cal-cobro-chip";
          chip.innerHTML = `${renderLogo(s.nombre, 20)}<span class="chip-nombre">${this._escapeHTML(s.nombre)}</span><span class="chip-monto">${this._formatCurrency(s.costo, s.moneda)}</span>`;
          celda.appendChild(chip);
        });
      }

      cuerpo.appendChild(celda);
    }
  }

  /**
   * Navega el calendario un mes hacia adelante o atrás.
   * @param {number} direccion - -1 para anterior, +1 para siguiente
   */
  _navegarCalendario(direccion) {
    this.calMes += direccion;
    if (this.calMes > 11) {
      this.calMes = 0;
      this.calAnio++;
    } else if (this.calMes < 0) {
      this.calMes = 11;
      this.calAnio--;
    }
    this.renderCalendario();
  }

  /* ============================================================
   *  Confirmación de eliminación
   * ============================================================ */

  /**
   * Solicita confirmación nativa antes de eliminar la suscripción.
   * Si el usuario acepta, delega en AppManager y refresca la vista.
   * @param {string} id
   */
  async _confirmarEliminar(id) {
    const sub = this.app.getSuscripcion(id);
    if (!sub) return;

    if (
      confirm(`¿Eliminar "${sub.nombre}"?\nEsta acción no se puede deshacer.`)
    ) {
      await this.app.eliminarSuscripcion(id);
      this._actualizarVista();
    }
  }

  /* ============================================================
   *  Utilidades de formato y seguridad
   * ============================================================ */

  /**
   * Formatea un número como cadena de moneda con 2 decimales.
   * @param   {number} valor
   * @returns {string}  Ej: "$15.99"
   */
  _formatCurrency(valor, moneda = "USD") {
    const simbolo = MONEDAS[moneda]?.simbolo || "$";
    return `${simbolo}${valor.toFixed(2)}`;
  }

  /**
   * Convierte una fecha en formato YYYY-MM-DD a DD/MM/YYYY (más legible).
   * @param   {string} isoDate  - Formato YYYY-MM-DD
   * @returns {string}
   */
  _formatDate(isoDate) {
    if (!isoDate) return "—";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  /**
   * Escapa caracteres HTML especiales para prevenir inyección de HTML/XSS
   * al insertar contenido de usuario en el DOM vía innerHTML.
   * @param   {string} str
   * @returns {string}
   */
  _escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  /* -------- Mensajes de error en auth -------- */

  _mostrarError(mensaje) {
    const el = document.getElementById("auth-error");
    el.textContent = mensaje;
    el.classList.remove("hidden");
  }

  _limpiarError() {
    const el = document.getElementById("auth-error");
    el.textContent = "";
    el.classList.add("hidden");
    el.style.background = "";
    el.style.color = "";
    el.style.borderColor = "";
  }

  _mostrarExito(mensaje) {
    const el = document.getElementById("auth-error");
    el.textContent = mensaje;
    el.classList.remove("hidden");
    el.style.background = "var(--success-light)";
    el.style.color = "var(--success)";
    el.style.borderColor = "#bbf7d0";
  }

  /* ============================================================
   *  Notificaciones de cobros próximos
   * ============================================================ */

  /**
   * Solicita permiso al navegador para mostrar notificaciones.
   * @returns {Promise<string>} El estado del permiso: "granted", "denied" o "default"
   */
  async _pedirPermisoNotificaciones() {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones de escritorio.");
      return "denied";
    }
    const permiso = await Notification.requestPermission();
    this._actualizarEstadoBtnNotif();
    return permiso;
  }

  /**
   * Verifica cobros próximos y crea una notificación del navegador por cada uno.
   * Usa tag con el ID de la suscripción para evitar duplicados.
   */
  _verificarCobrosProximos() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const dias = this._getConfigDias();
    const proximas = this.app.getSuscripcionesProximas(dias);

    if (proximas.length === 0) return;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    proximas.forEach((s) => {
      const fechaCobro = new Date(s.fechaCobro + "T00:00:00");
      const diffMs = fechaCobro.getTime() - hoy.getTime();
      const diasRestantes = Math.round(diffMs / (1000 * 60 * 60 * 24));

      const monto = this._formatCurrency(s.costo, s.moneda);
      let cuerpo;
      if (diasRestantes === 0) {
        cuerpo = `Tu suscripción de ${s.nombre} (${monto} ${s.moneda}) se cobra HOY`;
      } else if (diasRestantes === 1) {
        cuerpo = `Tu suscripción de ${s.nombre} (${monto} ${s.moneda}) se cobra mañana`;
      } else {
        cuerpo = `Tu suscripción de ${s.nombre} (${monto} ${s.moneda}) se cobra en ${diasRestantes} días`;
      }

      cuerpo += ` — ciclo ${s.ciclo}`;

      new Notification("💳 Cobro próximo", {
        body: cuerpo,
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💳</text></svg>",
        tag: `cobro-${s.id}`,
      });
    });

    // Actualizar badge en el botón
    this._actualizarBadgeNotif(proximas.length);
  }

  /**
   * Guarda la preferencia de días de aviso en localStorage.
   * @param {number} dias
   */
  _guardarConfigDias(dias) {
    localStorage.setItem("notif-dias-aviso", String(dias));
  }

  /**
   * Lee la preferencia de días de aviso desde localStorage. Default: 3.
   * @returns {number}
   */
  _getConfigDias() {
    const guardado = localStorage.getItem("notif-dias-aviso");
    return guardado ? parseInt(guardado, 10) : 3;
  }

  /**
   * Actualiza el estilo visual del botón de notificaciones según
   * el estado del permiso del navegador.
   */
  _actualizarEstadoBtnNotif() {
    const btn = document.getElementById("btn-notificaciones");
    if (!btn) return;

    btn.classList.remove("notif-active", "notif-denied");

    if (!("Notification" in window)) {
      btn.classList.add("notif-denied");
      return;
    }

    switch (Notification.permission) {
      case "granted":
        btn.classList.add("notif-active");
        break;
      case "denied":
        btn.classList.add("notif-denied");
        break;
      // "default" → sin clase extra (estilo normal)
    }
  }

  /**
   * Muestra u oculta un badge numérico en el botón de notificaciones
   * indicando cuántos cobros próximos hay.
   * @param {number} count
   */
  _actualizarBadgeNotif(count) {
    const btn = document.getElementById("btn-notificaciones");
    if (!btn) return;
    // Remover badge previo si existe
    const badgePrevio = btn.querySelector(".notif-badge");
    if (badgePrevio) badgePrevio.remove();

    if (count > 0) {
      const badge = document.createElement("span");
      badge.className = "notif-badge";
      badge.textContent = count;
      btn.appendChild(badge);
    }
  }

  /* ============================================================
   *  Enlace de eventos
   * ============================================================ */

  /**
   * Registra todos los event listeners de la aplicación en un solo lugar.
   * Se llama una única vez desde init().
   */
  _bindEventos() {
    /* ---- TABS: Login / Registro ---- */
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Actualizar estado visual y ARIA de las pestañas
        document.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        // Cambiar el texto del botón de envío según la pestaña activa
        const esLogin = btn.dataset.tab === "login";
        document.getElementById("auth-submit-btn").textContent = esLogin
          ? "Entrar"
          : "Registrarse";

        this._limpiarError();
      });
    });

    /* ---- FORMULARIO de Auth (Login / Registro) ---- */
    this.formAuth.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;
      const esLogin =
        document.querySelector(".tab-btn.active").dataset.tab === "login";

      if (esLogin) {
        const resultado = await this.app.login(email, password);
        if (resultado.ok) {
          this._mostrarVistaApp();
        } else {
          this._mostrarError(resultado.mensaje);
        }
      } else {
        const resultado = await this.app.registrar(email, password);
        if (resultado.ok) {
          document.querySelector('.tab-btn[data-tab="login"]').click();
          this._mostrarExito("Registro exitoso. Confirmá tu cuenta en el correo antes de iniciar sesión.");
        } else {
          this._mostrarError(resultado.mensaje);
        }
      }
    });

    /* ---- BOTÓN Cerrar Sesión ---- */
    document.getElementById("btn-logout").addEventListener("click", async () => {
      await this.app.logout();
      this._mostrarVistaAuth();
    });

    /* ---- BOTÓN Nueva Suscripción ---- */
    document.getElementById("btn-nueva").addEventListener("click", () => {
      this._abrirModalCrear();
    });

    /* ---- FORMULARIO de Suscripción (Crear / Editar) ---- */
    this.formSub.addEventListener("submit", async (e) => {
      e.preventDefault();

      const datos = {
        nombre: document.getElementById("sub-nombre").value.trim(),
        categoria: document.getElementById("sub-categoria").value,
        costo: document.getElementById("sub-costo").value,
        moneda: document.getElementById("sub-moneda").value,
        ciclo: document.getElementById("sub-ciclo").value,
        fechaCobro: document.getElementById("sub-fecha").value,
        estado: document.querySelector('input[name="sub-estado"]:checked')
          .value,
      };

      if (this.editandoId) {
        await this.app.editarSuscripcion(this.editandoId, datos);
      } else {
        await this.app.agregarSuscripcion(datos);
      }

      this._cerrarModal();
      this._actualizarVista();
    });

    /* ---- CERRAR MODAL — botones y clic en el fondo ---- */
    document
      .getElementById("modal-cerrar")
      .addEventListener("click", () => this._cerrarModal());
    document
      .getElementById("btn-cancelar-modal")
      .addEventListener("click", () => this._cerrarModal());
    this.modalOverlay.addEventListener("click", (e) => {
      // Solo cerrar si el clic fue directamente en el overlay (fondo oscuro),
      // no en el contenido del modal
      if (e.target === this.modalOverlay) this._cerrarModal();
    });

    /* ---- TECLA Escape para cerrar modal ---- */
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this.modalOverlay.classList.contains("hidden")
      ) {
        this._cerrarModal();
      }
    });

    /* ---- FILTROS (categoría y estado) ---- */
    document
      .getElementById("filtro-categoria")
      .addEventListener("change", () => this._actualizarVista());
    document
      .getElementById("filtro-estado")
      .addEventListener("change", () => this._actualizarVista());
    document
      .getElementById("filtro-orden")
      .addEventListener("change", () => this._actualizarVista());

    /* ---- NOTIFICACIONES ---- */
    document.getElementById("btn-notificaciones").addEventListener("click", async () => {
      const permiso = await this._pedirPermisoNotificaciones();
      if (permiso === "granted") {
        this._verificarCobrosProximos();
      }
    });
    document.getElementById("config-dias-aviso").addEventListener("change", (e) => {
      this._guardarConfigDias(parseInt(e.target.value, 10));
      if ("Notification" in window && Notification.permission === "granted") {
        this._verificarCobrosProximos();
      }
    });

    /* ---- CALENDARIO: navegación mensual ---- */
    document.getElementById("cal-anterior").addEventListener("click", () => {
      this._navegarCalendario(-1);
    });
    document.getElementById("cal-siguiente").addEventListener("click", () => {
      this._navegarCalendario(1);
    });

    /* ---- PREVIEW de logo en el modal ---- */
    document.getElementById("sub-nombre").addEventListener("input", (e) => {
      const preview = document.getElementById("logo-preview");
      const valor = e.target.value.trim();
      if (valor.length >= 2) {
        preview.innerHTML = renderLogo(valor, 48);
        preview.classList.add("logo-preview--visible");
      } else {
        preview.innerHTML = "";
        preview.classList.remove("logo-preview--visible");
      }
    });
  }
}

/* ============================================================
 *  INICIALIZACIÓN DE LA APLICACIÓN
 *
 *  1. Se crea la instancia de AppManager (lógica de negocio).
 *  2. Se crea la instancia de UI, inyectando el AppManager.
 *  3. UI.init() determina la vista inicial según la sesión
 *     y registra todos los event listeners.
 * ============================================================ */
const app = new AppManager();
const ui = new UI(app);
ui.init();
