# AgentPad Frontend Testing Checklist

## ✅ Pre-Launch Tests

### 1. Environment Setup
- [ ] Verify `.env` has correct RPC URL: `NEXT_PUBLIC_RPC_URL=https://rpc.moderato.tempo.xyz`
- [ ] Check contract addresses are updated:
  - AgentPad: `0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4`
  - AgentRegistry: `0x7e64a0f655a9E0905034da927f777b7D2cc091b8`
  - TIP-20 tokens (pathUSD, alphaUSD) - get real addresses from Tempo

### 2. Build Verification
```bash
cd /home/agent/openclaw/agentpad-frontend
npm run build
```
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build completes successfully

### 3. Local Development Test
```bash
npm run dev
```
- [ ] Frontend loads at `http://localhost:3000`
- [ ] No console errors in browser
- [ ] All components render correctly

## 🔗 Wallet Connection Tests

### 4. Connect Wallet
- [ ] MetaMask connects successfully
- [ ] WalletConnect QR code appears
- [ ] Coinbase Wallet connects
- [ ] Account address displays correctly after connection
- [ ] Disconnect button works

### 5. Network Switching
- [ ] Auto-detects Tempo Moderato network
- [ ] Prompts to switch network if on wrong chain
- [ ] Displays correct balance after network switch

## 👤 Agent Registration Tests

### 6. Register as Agent
- [ ] RegisterAgent component shows for new users
- [ ] Clicking "Register Agent" sends transaction
- [ ] No gas fee prompted (Tempo sponsorship)
- [ ] Success message appears after registration
- [ ] User can now access launch creation

### 7. Registered Agent State
- [ ] Registration status persists on refresh
- [ ] CreateLaunch becomes available after registration
- [ ] Agent ID displays (when implemented)

## 🚀 Launch Creation Tests

### 8. Create New Launch
- [ ] Token selector shows pathUSD and alphaUSD
- [ ] Target amount input accepts valid numbers
- [ ] Min/Max contribution validation works
- [ ] Duration and Vesting fields work
- [ ] "Create Launch" button is enabled when form is valid
- [ ] Transaction sent to contract
- [ ] Success message with explorer link appears

### 9. Launch Display
- [ ] New launch appears in LaunchList within 2 seconds
- [ ] Progress bar shows correctly
- [ ] Agent address displays (cut version)
- [ ] Countdown timer works
- [ ] Contribution count shows

## 💸 Contribution Tests

### 10. Contribute to Launch
- [ ] "Contribute" button opens modal
- [ ] Contribution amount input works
- [ ] Approval transaction sent (if first time)
- [ ] Contribution transaction sent
- [ ] No gas fee prompted
- [ ] Success message appears
- [ ] Launch progress updates immediately
- [ ] Contribution count increments

### 11. Contribution Limits
- [ ] Cannot contribute less than min
- [ ] Cannot contribute more than max
- [ ] Cannot exceed target amount
- [ ] Proper error messages shown

## 📊 Real-Time Updates

### 12. Live Data
- [ ] Launch progress updates as contributions come in
- [ ] New launches appear without page refresh
- [ ] Contract read operations complete within 3 seconds
- [ ] Loading states work correctly

## 🔒 Error Handling

### 13. Edge Cases
- [ ] Network disconnect shows helpful message
- [ ] Contract reverts display user-friendly errors
- [ ] Invalid inputs show validation messages
- [ ] Wallet rejection handled gracefully
- [ ] timeout errors show retry option

## 📱 UI/UX Tests

### 14. Responsive Design
- [ ] Desktop view (1920px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] All buttons clickable on mobile
- [ ] Forms usable on small screens

### 15. Visual Checks
- [ ] Colors match Tempo branding
- [ ] Fonts render correctly
- [ ] Icons display
- [ ] Spacing and alignment good
- [ ] No overflow issues

## 🎯 Tempo-Specific Tests

### 16. Native Features
- [ ] Zero gas prompt works
- [ ] TIP-20 token integration functional
- [ ] Transaction finality < 2 seconds
- [ ] Batch operations work (if implemented)
- [ ] StateSyncer connects properly

## 🚢 Deployment Tests

### 17. Production Build
```bash
npm run build && npm run start
```
- [ ] Production build runs without errors
- [ ] Environment variables injected correctly
- [ ] API routes work (if any)
- [ ] Static assets load

### 18. Vercel Deployment
- [ ] Deploy to Vercel staging
- [ ] Verify environment variables set in Vercel
- [ ] Test on production domain
- [ ] SSL/HTTPS working
- [ ] CDN caching configured

## 📝 Documentation

### 19. Files Complete
- [ ] README.md has setup instructions
- [ ] TEMPO_FEATURES.md explains Tempo integration
- [ ] Testing Checklist (this file) is complete
- [ ] Deployment guide updated

## 🐛 Known Issues

| Issue | Severity | Status | Workaround |
|-------|----------|--------|------------|
| TIP-20 addresses not finalized | High | 🟡 TODO | Use placeholder until real addresses available |
| Agent ID not fetched from contract | Medium | 🟡 TODO | Use random placeholder for now |
| No real-time updates | Medium | 🟢 Planned | Implement WebSocket/polling later |

## ✅ Final Verification

Before going live:
- [ ] All critical tests pass (1-12)
- [ ] No high-severity issues open
- [ ] Contract addresses verified
- [ ] Wallet connections work
- [ ] User flow is smooth end-to-end
- [ ] Error messages are helpful
- [ ] Performance is acceptable (<3s page load)

**Testing Lead:** Lyrantic  
**Last Updated:** 2026-03-25  
**Status:** 🟡 In Progress

---

**Next Steps:**
1. Get real TIP-20 token addresses from Tempo docs
2. Run build to check for compilation errors
3. Test on Tempo Moderato testnet
4. Fix any issues found
5. Deploy to Vercel
