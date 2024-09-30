function getICRT_URL(startDate, endDate) {
    var icrt_url = `https://www.icrt.com.tw/news_lunchbox.php?s_date=${startDate}&e_date=${endDate}&level1_id=&search_level2_id=&level2_id=&search_level3_id=&level3_id=&lunchbox_sort=1&subject=&imageField=搜尋&mlevel1=7&mlevel2=96&mlevel3=`;
    return icrt_url;
}


async function fetchICRTNews(startDate, endDate) {
    var url = getICRT_URL(startDate, endDate);
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.text();
        const detailsBlocks = data.match(/<div class="styB_details"[\s\S]*?<div class="txts">[\s\S]*?<\/div>\s*<\/div>/g);

        if (detailsBlocks) {
            detailsBlocks.forEach((block, index) => {
                const txtsBlock = block.match(/<div class="txts">([\s\S]*?)<\/div>/);
                if (txtsBlock) {
                    
                    console.log(`區塊 ${index + 1} 內容:\n${txtsBlock[1].trim()}\n`);
                    
                } else {
                    console.log('未找到任何匹配的內容');
                }
            });
        } else {
            console.log('未找到任何匹配的內容');
        }


        } else {
            console.error('HTTP 錯誤: ' + response.status);
        }
    } catch (error) {
        console.error('發生錯誤: ' + error);
    }
}

var startDate = new Date();
startDate.setDate(startDate.getDate() - 7);
startDate = startDate.toISOString().split('T')[0];

var endDate = new Date().toISOString().split('T')[0];
var url = getICRT_URL(startDate, endDate);

console.log(url);

fetchICRTNews(endDate, endDate);




