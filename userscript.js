const device = detectDevice(); 
const browser = detectBrowser();
const iconHTML1 = getDeviceiconHTML1(device);
const iconHTML2 = getDeviceiconHTML2(browser);
const link = document.querySelector('.modal1');
const modal1text = document.querySelector('.modal1-text');
const modal2text = document.querySelector('.modal2-text');
const browserinfo = document.querySelector(".browserinfo");

function showTime() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    var week = "日一二三四五六".charAt(date.getDay()); 
    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour; 
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var second = date.getSeconds();
    second = second < 10 ? "0" + second : second;

    var current = '<i class="fa-solid fa-clock"></i>  '+year + "-" + month + "-" + day + " " + /*"周" + week +*/ " " + hour + ":" + minute + ":" + second;

    document.getElementById("time").innerHTML = current;
}

setInterval(showTime, 1000);

// 检测设备环境
function detectDevice() {
    const userAgent = navigator.userAgent;

    if (/Windows/i.test(userAgent)) return "Windows";
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod|Mac/i.test(userAgent)) return "Apple";
    if (/Linux/i.test(userAgent)) {
        if (/Ubuntu/i.test(userAgent)) return "Ubuntu";
        if (/CentOS/i.test(userAgent)) return "CentOS";
        return "Linux";
    }
    return "Others";
}

// 检测浏览器环境
function detectBrowser() {
    const userAgent = navigator.userAgent;

    if (/Edg/i.test(userAgent)) return "Edge";
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) return "Chrome";
    if (/Firefox/i.test(userAgent)) return "Firefox";
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return "Safari";
    if (/OPR/.test(userAgent) || /Opera/.test(userAgent)) return "Opera";
    if (/QihooBrowser/.test(userAgent) || /QIHU/.test(userAgent)) return "360Brower";
    return "Others";
}

function BrowserInfo() {
    var userAgent = navigator.userAgent;           
    var info = "";
    info += "  " + userAgent + "<br />";
    return info;
}

link.addEventListener('click', function (event) {
    event.preventDefault();
    modal1text.innerHTML = `${iconHTML1} ${device}`;
    modal2text.innerHTML = `${iconHTML2} ${browser}`;
    browserinfo.innerHTML = BrowserInfo();
});

function getDeviceiconHTML1(device) {
    switch (device) {
        case "Windows":
            return '<i class="fa-brands fa-microsoft"></i>'; 
        case "Ubuntu":
            return '<i class="fa-brands fa-ubuntu"></i>';
        case "CentOS":
            return '<i class="fa-brands fa-centos"></i>';
        case "Android":
            return '<i class="fa-brands fa-android"></i>'; 
        case "Apple":
            return '<i class="fa-brands fa-apple"></i>'; 
        default:
            return '<i class="fa-solid fa-question"></i>'; 
    }
}

function getDeviceiconHTML2(browser) {
    switch (browser) {
        case "Edge":
            return '<i class="fa-brands fa-edge"></i>'; 
        case "Chrome":
            return '<i class="fa-brands fa-chrome"></i>'; 
        case "Firefox":
            return '<i class="fa-brands fa-firefox"></i>'; 
        case "Safari":
            return '<i class="fa-brands fa-safari"></i>';
        case "Opera":
            return '<i class="fa-brands fa-opera"></i>';
        default:
            return '<i class="fa-solid fa-question"></i>'; 
    }
}

const toggleDropdown = (dropdown, menu, isOpen) => {
    const isCollapsed = document.querySelector('.sidebar').classList.contains('collapsed');
    
    
    if (!isCollapsed) {
        menu.style.transition = 'height 0.3s ease-out'; 
        menu.style.opacity = ''; 
    }

    
    dropdown.classList.toggle("open", isOpen);

    
    if (isCollapsed) {
        menu.style.transition = 'opacity 0.2s ease';
        menu.style.opacity = isOpen ? '1' : '0';
        menu.style.pointerEvents = isOpen ? 'auto' : 'none';
    } else {
        menu.style.height = isOpen ? `${menu.scrollHeight}px` : '0';
    }
};

const smartCloseDropdowns = (currentDropdown) => {
    document.querySelectorAll(".dropdown-container.open").forEach(openDropdown => {
        if (openDropdown !== currentDropdown) {
            toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
        }
    });
};

function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-container.open").forEach(dropdown => {
        const menu = dropdown.querySelector(".dropdown-menu");
        const isCollapsed = document.querySelector(".sidebar").classList.contains("collapsed");

        if (isCollapsed) {
            menu.style.transition = "opacity 0.2s ease";
            menu.style.opacity = "0";
            menu.style.pointerEvents = "none";
        } else {
            
            menu.style.transition = "height 0.3s ease-out"; 
            menu.style.height = "0";
        }
        dropdown.classList.remove("open");
    });
}

let isSidebarCollapsed = document.querySelector(".sidebar").classList.contains("collapsed");
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
            isSidebarCollapsed = mutation.target.classList.contains("collapsed");
            
            closeAllDropdowns();
        }
    });
});
observer.observe(document.querySelector(".sidebar"), { attributes: true });

document.querySelectorAll(".dropdown-toggle").forEach(dropdownToggle => {
    dropdownToggle.addEventListener("click", e => {
        e.preventDefault();
        const dropdown = e.target.closest(".dropdown-container");
        const menu = dropdown.querySelector(".dropdown-menu");
        const isOpen = dropdown.classList.contains("open"); 

        
        smartCloseDropdowns(dropdown);
        
        toggleDropdown(dropdown, menu, !isOpen);
    });
});

document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', function() {
        const parentDropdown = this.closest('.dropdown-container');
        if (parentDropdown) {
            toggleDropdown(parentDropdown, parentDropdown.querySelector(".dropdown-menu"), false);
        }
    });
});

document.querySelector(".sidebar-toggler").addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const isCollapsing = sidebar.classList.toggle("collapsed");

    
    document.querySelectorAll(".dropdown-container.open").forEach(dropdown => {
        const menu = dropdown.querySelector(".dropdown-menu");
        
        
        if (isCollapsing) {
            
            menu.style.transition = "opacity 0.2s ease";
            menu.style.opacity = "0";
            menu.style.pointerEvents = "none";
        } else {
            
            menu.style.height = "0";
        }
        dropdown.classList.remove("open");
    });

    
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (isCollapsing) {
            menu.style.height = "";
        } 
        if (!isCollapsing) { 
            menu.style.transition = "height 0.3s ease-out"; 
            menu.style.opacity = ""; 
        }
    });
});



// 页面切换逻辑
document.querySelectorAll('.nav-link,.header-logo').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === 'index.html') {
            return;
        }

        const isDropdownToggle = this.classList.contains('dropdown-toggle');
        const parentDropdown = this.closest('.dropdown-container');
        
        if (isDropdownToggle) {
            e.preventDefault();
            const menu = parentDropdown.querySelector('.dropdown-menu');
            const isOpen = parentDropdown.classList.contains('open');
            
            smartCloseDropdowns(parentDropdown);
            toggleDropdown(parentDropdown, menu, !isOpen);
            
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                switchPage(target.replace('#', ''));
                setActiveNav(this);
            }
        } else {
            e.preventDefault();
            closeAllDropdowns();
            switchPage(this.getAttribute('href').replace('#', ''));
            setActiveNav(this);
            
            if (parentDropdown) {
                toggleDropdown(parentDropdown, parentDropdown.querySelector(".dropdown-menu"), false);
            }
        }
    });
});

function switchPage(pageId) {
    
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {

        document.getElementById('home').classList.add('active');
    }
}

function setActiveNav(clickedLink) {
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    clickedLink.classList.add('active');
    
    const parentItem = clickedLink.closest('.dropdown-container');
    if (parentItem) {
        const menu = parentItem.querySelector('.dropdown-menu');
        toggleDropdown(parentItem, menu, true);
    }
}

switchPage('home');
setActiveNav(document.querySelector('.nav-link[href="#home"]'));

document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('a[href="index.html"]').addEventListener('click', function(e) {
        e.preventDefault(); 
        document.getElementById('logoutModal').style.display = 'block';
    });

    
    document.querySelector('.logout-cancel').addEventListener('click', function() {
        document.getElementById('logoutModal').style.display = 'none';
    });

   
    document.querySelector('.logout-confirm').addEventListener('click', function() {
        window.location.href = 'index.html'; 
    });

    
    document.getElementById('logoutModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const musicPlatform = document.getElementById('musicPlatform');
    const playlistId = document.getElementById('playlistId');
    const applyButton = document.getElementById('applyMusicSettings');
    const metingContainer = document.getElementById('metingContainer');

    
    const savedSettings = JSON.parse(localStorage.getItem('musicSettings') || '{}');
    if (savedSettings.platform) {
        musicPlatform.value = savedSettings.platform;
    }
    if (savedSettings.id) {
        playlistId.value = savedSettings.id;
        
        updateMetingPlayer(savedSettings.platform, savedSettings.id);
    }

    applyButton.addEventListener('click', function() {
        const platform = musicPlatform.value;
        const id = playlistId.value;
        
        if (!id) {
            alert('请输入歌单ID');
            return;
        }

        
        localStorage.setItem('musicSettings', JSON.stringify({
            platform: platform,
            id: id
        }));

    
        updateMetingPlayer(platform, id);
    });

    function updateMetingPlayer(platform, id) {
        
        const existingLoadingDivs = metingContainer.querySelectorAll('.loading-text');
        existingLoadingDivs.forEach(div => div.remove());
        
        
        const oldMeting = metingContainer.querySelector('meting-js');
        if (oldMeting) {
            if (oldMeting.aplayer) {
                oldMeting.aplayer.destroy();
            }
            metingContainer.removeChild(oldMeting);
        }
        
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-text';
        loadingDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 加载中...';
        metingContainer.appendChild(loadingDiv);
        
        
        const metingJs = document.createElement('meting-js');
        metingJs.setAttribute('server', platform);
        metingJs.setAttribute('type', 'playlist');
        metingJs.setAttribute('id', id);
        metingJs.setAttribute('preload', 'none');
        metingJs.setAttribute('autoplay', 'false');
        metingJs.setAttribute('mutex', 'true');
        
        
        const observer = new MutationObserver((mutations, obs) => {
            const aplayer = metingJs.querySelector('.aplayer');
            if (aplayer) {
                
                if (loadingDiv.parentNode) {
                    loadingDiv.remove();
                }
                obs.disconnect(); 
            }
        });
        
        
        observer.observe(metingJs, {
            childList: true,
            subtree: true
        });
        
        
        metingJs.addEventListener('error', (e) => {
            console.error('Meting player error:', e);
            if (loadingDiv.parentNode) {
                loadingDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> 加载失败，请检查歌单ID是否正确';
                loadingDiv.style.color = '#ff4444';
            }
            observer.disconnect(); 
        });
        
        
        const timeoutId = setTimeout(() => {
            if (loadingDiv.parentNode) {
                loadingDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> 加载失败，请检查以下项: <br>1. 确保平台选择正确<br> 2. 确保歌单id输入正确<br>3. 确保网络连接正常';
                loadingDiv.style.color = '#ff4444';
                observer.disconnect();
            }
        }, 10000); 
        
        
        metingContainer.appendChild(metingJs);
    }
});


