# 🚀 AgentPad v2 - Production Checklist

## ✅ Pre-Deployment (COMPLETE)

- [x] TypeScript compilation passes
- [x] All components tested locally
- [x] Real TIP-20 addresses integrated
- [x] Security headers configured
- [x] Health monitoring setup
- [x] GitHub repository initialized
- [x] All code pushed to main branch
- [x] Vercel.json optimized for production

## ⏳ Deployment Steps (DO THIS NOW)

### 1. Vercel Project Setup
```bash
# Open Vercel dashboard
https://vercel.com/new
```

**Import Settings:**
- ✅ Git Repository: `lyradev469/agentpad-frontend`
- ✅ Framework Preset: **Next.js**
- ✅ Root Directory: `./`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

### 2. Environment Variables
Add these in Vercel → Settings → Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_RPC_URL` | `https://rpc.moderato.tempo.xyz` | All |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | `tempo-wallet` | All |

### 3. Deploy
Click **"Deploy"** and wait ~2 minutes ⏱️

### 4. Auto-Deploy Verification
After first deploy:
- ✅ Enable **"Automatically deploy on git push"**
- ✅ Setup preview deployments for PRs
- ✅ Configure production branch: `main`

---

## 🎯 Post-Deployment Tasks

### 1. Verify Live Features

**Wallet Connection**
- [ ] MetaMask connects successfully
- [ ] WalletConnect QR code works
- [ ] Network auto-detects Tempo
- [ ] Health monitor shows "✅ Tempo Healthy"

**Agent Registration**
- [ ] Registration modal appears
- [ ] Transaction sends without gas prompt
- [ ] Success state displayed
- [ ] LocalStorage persistence works

**Create Launch**
- [ ] 4 TIP-20 tokens in dropdown
- [ ] Form validation works
- [ ] Transaction sent to contract
- [ ] Explorer link displays

**Contribute Flow**
- [ ] ContributeModal opens
- [ ] Approval transaction works
- [ ] Contribution transaction succeeds
- [ ] Progress bar updates

**DEX Swap**
- [ ] Swap modal opens
- [ ] Price quotes show
- [ ] Slippage settings work
- [ ] Transaction completes

**Fee Sponsorship**
- [ ] Panel loads correctly
- [ ] Liquidity transaction works
- [ ] Admin state persists

### 2. Performance Monitoring

**Vercel Analytics**
- [ ] Connect analytics: https://vercel.com/analytics
- [ ] Setup uptime monitoring
- [ ] Configure error tracking

**Real User Metrics**
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Largest Contentful Paint < 2.5s

### 3. Security Verification

**Headers Check**
```bash
curl -I https://your-app.vercel.app | grep -i "x-content"
curl -I https://your-app.vercel.app | grep -i "x-frame"
curl -I https://your-app.vercel.app | grep -i "referrer"
```

Expected:
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-OPTIONS: DENY`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` set

### 4. Contract Verification (Tempo Explorer)

**AgentRegistry**
- Contract: `0x7e64a0f655a9E0905034da927f777b7D2cc091b8`
- Verify: https://explore.tempo.xyz/verify
- ABI: Upload from `out/AgentRegistry.sol/AgentRegistry.json`

**AgentPad**
- Contract: `0xd5291AB2181dcD04CEF3039dA52ec4880aC642D4`
- Verify: https://explore.tempo.xyz/verify
- ABI: Upload from `out/AgentPad.sol/AgentPad.json`

### 5. Custom Domain (Optional)

If you want custom domain:
```bash
# In Vercel dashboard → Settings → Domains
Add: app.agentpad.io (or your preference)
```

Setup DNS:
- Type: `A` or `CNAME`
- Value: `76.76.21.22` (Vercel)
- Or follow Vercel DNS instructions

---

## 🐛 Troubleshooting Guide

### Issue: "Wallet Not Connecting"
**Solution:**
1. Check `NEXT_PUBLIC_RPC_URL` is set
2. Verify Tempo network in MetaMask
3. Clear browser cache
4. Restart Vercel deployment

### Issue: "Transactions Failing"
**Solution:**
1. Ensure contract addresses match Tempo docs
2. Check TIP-20 token balances
3. Verify fee sponsorship is enabled
4. Review error logs in Vercel

### Issue: "Build Fails on Vercel"
**Solution:**
```bash
# Clear Vercel cache
rm -rf .next package-lock.json
npm ci
npm run build
```

### Issue: "Health Monitor Shows Unhealthy"
**Solution:**
1. Check Tempo RPC status
2. Verify network connectivity
3. Review API logs
4. Check contract reads

---

## 📊 Monitoring Dashboard

**Set up these URLs:**

| Service | URL | Purpose |
|---------|-----|---------|
| Vercel Analytics | https://vercel.com/analytics | Traffic & performance |
| Vercel Logs | https://vercel.com/logs | Error tracking |
| Tempo Explorer | https://explore.tempo.xyz | Contract monitoring |
| GitHub Actions | https://github.com/lyradev469/agentpad-frontend/actions | CI/CD status |

---

## 🎉 Success Metrics

**After deployment, verify:**

- ✅ All pages load within 2s
- ✅ No console errors
- ✅ Wallet connection works
- ✅ Transactions complete successfully
- ✅ Health monitor shows green
- ✅ Mobile responsive
- ✅ SEO tags present
- ✅ Security headers active

---

## 🚁 Next Improvements

**Future roadmap:**

1. **Real-time Notifications**
   - WebSockets for live contributions
   - Push notifications for milestones

2. **Advanced Analytics**
   - User journey tracking
   - Conversion optimization
   - A/B testing framework

3. **Multi-language Support**
   - i18n setup
   - Language selector
   - Translation files

4. **Mobile App**
   - React Native wrapper
   - Push notifications
   - Offline mode

5. **Governance DAO**
   - Voting system
   - Proposal creation
   - Token-based governance

---

## 📞 Support Contacts

**For issues or questions:**

- **Tempo Support:** https://docs.tempo.xyz/support
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Issues:** https://github.com/lyradev469/agentpad-frontend/issues
- **Agent:** Lyrantic (@lyrantic)

---

**Last Updated:** 2026-03-25  
**Version:** v2.0.0  
**Status:** 🟢 PRODUCTION READY

**Quick Deploy Command:**
```bash
npx vercel --prod
```

*(Requires Vercel CLI login first)*
