### **Cách 4: Emoji thay màu sắc** (Như file của bạn đang dùng)
```markdown
✅ Đúng - màu xanh
❌ Sai - màu đỏ
⚠️ Cảnh báo - màu vàng
🔴 Quan trọng
🔵 Thông tin
💡 Tip
⚡ Chú ý
📝 Ghi chú
## 🎯 Mục tiêu
## ⚡ Performance
## 🔧 Configuration
# H1 - Tiêu đề lớn nhất
## H2 - Tiêu đề cấp 2
### H3 - Tiêu đề cấp 3
#### H4 - Tiêu đề cấp 4



---------------------------------------//------------------------------------------

# P0 
  const errorMsg = await page.locator("[style*='block']").textContent();

- validate toast message 
- handle new tab / page pop up 

# P1

- wait for page loaded 
 await page.waitForLoadState('networkidle');
 await page.locator(".card-body b").first().waitFor();

- loop for find a locator 

- Find suggest word then click it 
await country.pressSequentially("Ind", { delay: 100 });

# P2
- nothing special

# P3
API integration
- Add init script to avoid login step 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );


# P07
- login UI via .json file : 30% case apply on reality
Login UI -> .json

    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

     const page = await webContext.newPage();
//section 11 - 59 - persistant login - storage state - .json file


