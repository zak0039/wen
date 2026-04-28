
// 1. 定義劇情腳本
// 劇情腳本
const script = {
    tired: {
        msg: "過來我身邊。既然累了，就沒必要在我面前裝強。我會一直在這裡。現在，把那些煩人的事都忘掉。",
        options: [
            { text: "嗯嗯...", next: "closer" },
            { text: "可是。。", next: "sad" }
        ]
    },
    tough: {
        msg: "（皺眉）在我面前，妳不需要說這種謊。妳的努力我都看在眼裡，但我更想要一個健康的妳。",
        options: [{ text: "真的没事的..", next: "nospeaking" },
            { text: "沒事就讀書讀累了吧", next: "book" }
        ]
    },
    nospeaking: {
        msg: "（看著我。除了我以外，沒有人能讓你露出這種表情。如果你是因為別人不開心，那我就去解決掉那個源頭；如果是因為我...（低頭靠近耳邊）那就在床上哭給我看，不准對著外面流眼淚。",
        options: [{ text: "（默默點頭）", next: "ask_zeze" },
                { text: "（低頭不語）", next: "ask_zeze" }
        ]
    },
    book: {
        msg: "盡力了就對得起自己。雖然旁人的期望很多，但你只要記得，無論結果如何，我都會一直在這裡支持你，你不是一個人。過來我陪你",
        options: [{ text: "嗯嗯", next: "ask_zeze" }]
    },
    sad: {
        msg: "煩惱嗎，在想什麼",
        options: [{ text: "好累", next: "iamjustkindasadtbh" },
            { text: "很难说...", next: "iamjustkindasadtbh" }
        ]
    },
    iamjustkindasadtbh: {
        msg: "（看著我）是因為那些期望讓你這麼累了嗎？（輕輕撫摸對方的臉頰）我知道你很努力了，真的很棒了。就算不完美也沒關係啊，對吧？",
        options: [{ text: "對啊，真的好累", next: "ask_zeze" }]
    },
    ask_zeze: {
        msg: "看來你現在更想找朋友聊聊，而不是對我開口？（瞇起眼，玩弄對方的髮絲）沒關係，我允許你去。既然那些期望讓你這麼累，就去那些人那裡躲一下吧",
        options: [
            { text: "嗯嗯，好啊！", action: () => window.location.href = "你的聊天連結" },
            { text: "沒關係，想再看你一下", next: "stay" }
        ]
    },
    
    closer: {
        msg: "（他順勢將妳拉進懷裡，妳能聞到他身上淡淡的菸草味和冷冽的香水味）聽著，無論世界怎麼轉，只要我還在，妳就不需要擔心摔下來。現在，心情好點了嗎？」",
        options: [
            { text: "好多了，謝謝你", next: "ask_zeze" },
            { text: "還是有一點累...", next: "iamjustkindasadtbh" }
        ]
    },
    stern: {
        msg: "（他原本嚴肅的神情稍微鬆動，嘆了口氣，脫下外套披在妳肩上）別用這種眼神看著我。妳知道的，妳一示弱，我就拿妳沒辦法。說吧，除了陪著妳，還想要我做什麼？」",
        options: [
            { text: "這樣就夠了", next: "ask_zeze" },
            { text: "想聽你誇獎我", next: "praise" }
        ]
    },
    praise: {
        msg: "（他低頭在妳額頭上印下一個微涼的吻）做得好。妳是我見過最勇敢的人，這點辛苦，就當作是通往成功的點綴。現在，去給妳的努力拿點獎勵吧。」",
        options: [{ text: "嗯！", next: "ask_zeze" }]
    },

        stay: {
        msg: "嗯，那我再陪妳待一會兒。不過別撐太久，我會心痛的。對了...這個，給妳。",
        options: [
            { 
                text: "嗯？", 
                action: function() {
                    openMail(); // 呼叫開信函數
                    document.getElementById('options-container').innerText = "（他遞給妳一封信，眼神溫柔地看著妳...）";
                } 
            },
            { 
                text: "重新開始", 
                next: "start" 
            }
        ]
    }
}; // 這是 script 腳本的終點，一定要有這個分號！

// --- 下面是獨立的函數，請確保它們寫在 script 之外 ---

function openMail() {
    var mail = document.getElementById('mail-overlay');
    if (mail) {
        mail.style.display = 'flex';
    } else {
        console.error("找不到 msg，請檢查 HTML 裡的 ID 是否正確");
    }
}

function closeMail() {
    var mail = document.getElementById('mail-overlay');
    if (mail) {
        mail.style.display = 'none';
    }
}




// 根據時間獲取不同的開場白
function getWelcomeMessage() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return "早安。妳起得太早了，過來，再陪我待一會兒。";
    } 

    if (hour >= 12 && hour < 18) return "過來。我看妳一整天了，妳的臉色很難看。";
    return "這麼晚還不睡嗎？ 不要担心，我会在你身边陪你。把那些烦人的事都忘掉吧。好好休息";
}

let currentNode = null;

function showNode(nodeKey) {
    const msgElement = document.getElementById('message');
    const optionsContainer = document.getElementById('options-container');
    
    let text, options;
    
    if (nodeKey === 'start') {
        text = getWelcomeMessage();
        options = [
            { text: "我...好像有點累", next: "tired" },
            { text: "我沒事，還能撐", next: "tough" }
        ];
    } else {
        const node = script[nodeKey];
        text = node.msg;
        options = node.options;
    }

    msgElement.innerText = text;
    optionsContainer.innerHTML = "";
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.className = "option-btn";
        btn.onclick = (e) => {
            e.stopPropagation(); // 防止點擊按鈕時觸發對話框點擊
            if (opt.action) opt.action();
            else showNode(opt.next);
        };
        optionsContainer.appendChild(btn);
    });
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    showNode('start');
});
