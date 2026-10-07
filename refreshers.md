<!--
Refresher readings for the Refresher tab.
  # Area        one of the ten CFA Level I topic names
  ## Title      starts a reading (its id is made from the title, so renaming one un-saves it)
  ### Heading   a section inside a reading
  - item / 1. item, **bold**, $$ display formula $$ on its own line, \( inline formula \)
-->

# Ethics

## Material nonpublic information and the mosaic theory

Standard II(A) is one of the most tested standards. The question is almost always whether the information is both **material** and **nonpublic**.

### The two tests
- **Material:** a reasonable investor would want to know it, or it would likely move the price. The more reliable the source, the more likely it's material.
- **Nonpublic:** not yet disseminated to the market at large. Telling a group of analysts on a private call doesn't make it public.

If both apply, you can't trade on it or cause others to trade on it. The duty applies even if you got it by accident (overheard in an elevator, a misdirected email).

### Mosaic theory
You may reach a conclusion by combining **public** information with **nonmaterial nonpublic** information, even if the conclusion itself would be material had the company announced it. Example: counting trucks at a factory plus reading public filings to conclude sales are rising.

### What to do if you have MNPI
- Don't act and don't pass it on.
- Encourage the issuer to make it public.
- Firms use **information barriers (firewalls)**, restricted lists and watch lists.

### Exam traps
- Selective disclosure to a few analysts is still nonpublic.
- A rumor that turns out true isn't automatically MNPI; ask whether it's material and from a reliable source.
- Trading on MNPI to **hedge** or to "help a client" is still a violation.
- Standard II(B) market manipulation is different: it's about distorting prices or volume (spreading false rumors, pump-and-dump), not trading on inside information.

## Independence and objectivity: gifts, issuer-paid research and pressure

Standard I(B) requires members to use reasonable care and judgment to stay independent and objective, and not to offer, solicit or accept anything that could compromise it.

### Gifts and entertainment
- **From clients:** usually acceptable, because the client is rewarding past performance. Disclose to your employer.
- **From a party trying to influence you** (a broker, an issuer you cover): much stricter. Only modest, customary items.
- **Additional compensation tied to client work** (a client's bonus if you beat a target): that's Standard IV(B). You need written consent from your employer.

### Issuer-paid research
Allowed if pay is a flat fee not tied to the conclusion, and the payment arrangement is disclosed.

### Other pressure points
- Investment banking colleagues pushing for a favorable rating: the firm should have firewalls, and the analyst sets the rating.
- Travel: pay for your own travel to company visits (commercial flights where possible) instead of the issuer's private jet.
- Credit rating analysts and buy-side managers are also covered.

### Exam traps
- Disclosure alone doesn't fix a gift that compromises independence.
- A modest client gift for good past performance is usually fine once disclosed, while the same item from a broker seeking business may not be.
- Restricting an analyst's negative rating to protect banking business is a I(B) problem for the firm and the analyst.

## Duties to clients: loyalty, fair dealing and suitability

Standard III covers what you owe clients. The order of priority: **clients, then employer, then yourself.**

### III(A) Loyalty, prudence and care
- Identify **who the client is**. For a pension plan, it's the plan's beneficiaries, not the sponsor's management.
- **Soft dollars** (brokerage commissions) belong to the client. Use them only for research that benefits the client.
- Vote proxies in the client's interest, with a cost-benefit view.

### III(B) Fair dealing
- Treat all clients **fairly**, not necessarily **equally**. Premium service levels are allowed if disclosed and available to everyone who pays for them.
- Disseminate recommendation changes to all clients at the same time.
- Allocate block trades and **oversubscribed IPOs pro rata**. You and your family don't get shares before clients.

### III(C) Suitability
- Get an **investment policy statement (IPS)** for advisory clients and update it at least annually.
- Judge suitability **in the context of the whole portfolio**, not each investment on its own.
- For unsolicited client trades that are unsuitable, document it and discuss it; you may need a new IPS if the client insists repeatedly.

### III(D) Performance presentation and III(E) Confidentiality
- Don't overstate performance; disclose if results are simulated or a single account.
- Keep client information confidential unless it concerns illegal activity or the law requires disclosure.

### Exam traps
- "Fair" doesn't mean "equal".
- Suitability is a portfolio-level test.
- Confidentiality ends when you're legally required to report, or the client allows disclosure.

## Conflicts of interest and priority of transactions

Standard VI is about spotting conflicts and handling them in the right order.

### VI(A) Disclosure of conflicts
Disclose to clients and employers anything that could reasonably impair independence: stock ownership in recommended companies, board seats, referral fees, compensation arrangements. Disclosure must be **prominent and in plain language**.

### VI(B) Priority of transactions
The order is: **clients, employer, then personal**.
- You can't front-run a client order.
- Family accounts that are clients get treated like other clients, not penalized or favored.
- Firms use blackout periods, pre-clearance of personal trades and limits on IPO participation.

### VI(C) Referral fees
Disclose to employers, clients and prospects the nature and value of any compensation for referrals, **before** the client agrees to the service.

### Related: IV(A) Loyalty to the employer
- You can prepare to leave (look for jobs, set up a firm) but not take client lists, records or solicit clients before you leave.
- Information you remember (no records) and publicly available data are fine to use afterwards.

### Exam traps
- Disclosure is required **before** the conflict affects the client, not after.
- A beneficial interest in a family member's account counts as personal for priority-of-transactions purposes.
- Whistleblowing to protect clients or markets can override loyalty to the employer.

## GIPS: the Global Investment Performance Standards

GIPS lets prospective clients compare managers' track records fairly.

### Key ideas
- **Voluntary:** firms choose to comply. Only a **firm** can claim compliance, not an individual or a single product.
- Compliance must be **firm-wide**; there's no partial compliance.
- **Composites:** group all actual, fee-paying, discretionary portfolios with a similar strategy. This stops managers from cherry-picking their best accounts.
- At least **5 years** of history (or since inception) when first claiming compliance, building to **10 years**.

### Verification
- Optional, done by an independent third party.
- Covers the **whole firm**: whether composite construction rules were followed and whether the policies and procedures are designed to comply. It doesn't certify a single composite's numbers.

### Exam traps
- "Partially compliant" or "in compliance except for…" is never allowed.
- Verification is firm-wide.
- Excluding underperforming discretionary accounts from a composite is exactly what GIPS prohibits.

# Quantitative Methods

## Time value of money: annuities, perpetuities and effective rates

Most calculator questions trace back to a handful of relationships.

### Core formulas
$$FV = PV(1 + r)^N \qquad PV = \frac{FV}{(1 + r)^N}$$

- **Ordinary annuity:** payments at the end of each period.
- **Annuity due:** payments at the start. Value = ordinary annuity value × \( (1 + r) \).
- **Perpetuity:** \( PV = \frac{A}{r} \). A growing perpetuity is \( \frac{A_1}{r - g} \), the same shape as the Gordon growth model.

### Compounding and effective rates
$$EAR = \left(1 + \frac{r_s}{m}\right)^m - 1$$

With continuous compounding, \( EAR = e^{r_s} - 1 \). More frequent compounding gives a higher EAR for the same stated rate.

### Cash-flow additivity
Any uneven cash-flow stream can be broken into pieces and valued separately. This is also the basis for no-arbitrage pricing.

### Exam traps
- An annuity starting in year 4 valued with the PV formula lands in **year 3** (one period before the first payment). Discount from there.
- Match the rate to the period: monthly payments need a monthly rate and the number of months.
- Check whether your calculator is in BEGIN or END mode.

## Rates of return: money-weighted vs time-weighted

Know which return measures what, and which one judges the manager.

### Holding period return
$$HPR = \frac{P_1 - P_0 + D_1}{P_0}$$

### Averages
- **Arithmetic mean:** best estimate of a single period's expected return.
- **Geometric mean:** the compound growth rate that actually happened. Always ≤ the arithmetic mean; the gap widens with volatility.
- **Harmonic mean:** used for average cost under cost averaging. Harmonic ≤ geometric ≤ arithmetic.

### Money-weighted vs time-weighted
- **Money-weighted return (MWR)** is the IRR of the investor's cash flows. Large deposits before good periods raise it.
- **Time-weighted return (TWR)** links sub-period returns between cash flows: \( (1 + r_1)(1 + r_2)\cdots - 1 \). It strips out the timing of client deposits and withdrawals.
- Use **TWR to evaluate a manager**, because the client controls the cash flows. MWR suits a manager who controls timing (like a private equity GP).

### Other return measures
- **Gross vs net:** net is after fees.
- **Real return:** \( (1 + r_{nominal}) / (1 + \pi) - 1 \).
- Leveraged return rises with leverage when the asset return beats the borrowing cost.

### Exam traps
- Answer "which measure for the manager?" with TWR.
- Annualizing a return earned over less than a year can overstate what's repeatable.

## Hypothesis testing: errors, p-values and test choice

The logic is the same every time: assume H₀ is true, and reject it only if the data are unlikely under H₀.

### The steps
1. State H₀ (always contains the equals sign) and Hₐ.
2. Pick the test statistic and significance level α.
3. Compare the statistic to the critical value, or the p-value to α.
4. Reject H₀ if the statistic falls in the rejection region, or if **p-value < α**.

### Errors
| | H₀ true | H₀ false |
| --- | --- | --- |
| Reject H₀ | **Type I error** (prob. α) | Correct (prob. = power) |
| Fail to reject | Correct | **Type II error** (prob. β) |

- Power = 1 − β.
- Lowering α cuts Type I errors but raises Type II errors, unless the sample gets bigger.

### Which test
- Single mean, variance unknown: **t-test** with n − 1 degrees of freedom.
- Difference in means, independent samples: t-test (pooled variance). Paired data (same firms before/after): **paired t-test**.
- Single variance: **chi-square**. Two variances: **F-test**.
- Correlation: t-test, \( t = \frac{r\sqrt{n - 2}}{\sqrt{1 - r^2}} \).
- Nonparametric tests (Spearman rank correlation, chi-square test of independence for contingency tables) when distribution assumptions fail or data are ranks.

### Exam traps
- You "fail to reject" H₀; you never "accept" it.
- Statistical significance isn't economic significance once costs are included.
- The p-value is the smallest α at which you'd reject H₀.

## Simple linear regression: assumptions and output

$$Y_i = b_0 + b_1 X_i + \varepsilon_i$$

### Estimates
- Slope: \( \hat{b}_1 = \frac{\text{Cov}(X, Y)}{\text{Var}(X)} \).
- Intercept: \( \hat{b}_0 = \bar{Y} - \hat{b}_1 \bar{X} \). The line passes through the means.

### Four assumptions
1. **Linearity** between X and Y.
2. **Homoskedasticity:** constant variance of residuals.
3. **Independence:** residuals uncorrelated with each other.
4. **Normality** of residuals.

### Reading the ANOVA table
- SST = SSR (explained) + SSE (unexplained).
- \( R^2 = \frac{SSR}{SST} \). In simple regression, R² equals the correlation squared.
- \( F = \frac{MSR}{MSE} = \frac{SSR / 1}{SSE / (n - 2)} \). With one independent variable, F = t² for the slope.
- **Standard error of the estimate:** \( SEE = \sqrt{MSE} \). Smaller is a better fit.

### Testing the slope
\( t = \frac{\hat{b}_1 - B_1}{s_{\hat{b}_1}} \) with n − 2 degrees of freedom. Usually B₁ = 0.

### Functional forms
Log-lin (ln Y on X), lin-log (Y on ln X), and log-log (slope is an elasticity) handle nonlinear relationships.

### Exam traps
- The prediction interval for Y widens the further X is from its mean.
- High R² doesn't prove causation.
- Residual patterns that fan out signal heteroskedasticity.

## Probability: Bayes' formula, expected value and covariance

### Rules
- Multiplication: \( P(AB) = P(A \mid B)\,P(B) \).
- Addition: \( P(A \text{ or } B) = P(A) + P(B) - P(AB) \).
- Total probability: \( P(A) = \sum P(A \mid S_i)\,P(S_i) \) over mutually exclusive, exhaustive scenarios.

### Bayes' formula
$$P(\text{Event} \mid \text{Info}) = \frac{P(\text{Info} \mid \text{Event})}{P(\text{Info})} \times P(\text{Event})$$

Use a tree: write prior probabilities, then the conditional probability of the new information on each branch.

### Odds
Odds **for** E = P(E) / [1 − P(E)]. Odds of 1 to 4 means P = 0.20.

### Portfolio math
- \( E(R_p) = \sum w_i E(R_i) \).
- \( \sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho_{12}\sigma_1\sigma_2 \).
- Correlation \( \rho = \frac{\text{Cov}}{\sigma_1 \sigma_2} \), between −1 and +1. Below +1 means diversification lowers risk.

### Counting
- Combinations (order doesn't matter): \( \frac{n!}{(n - r)!\,r!} \).
- Permutations (order matters): \( \frac{n!}{(n - r)!} \).

### Exam traps
- Independence means P(A | B) = P(A). Mutually exclusive means P(AB) = 0. They aren't the same thing.
- Correlation only measures **linear** association.

# Economics

## Twin deficits: budget and trade balances

Most of this ties back to one identity.

### The identity that links them
Start from GDP: \( Y = C + I + G + (X - M) \). Rearranged:
$$(S - I) = (G - T) + (X - M)$$

- G − T is the fiscal (budget) deficit.
- X − M is roughly the trade balance (current account).
- S − I is private-sector net saving.

If private saving doesn't rise to cover a bigger budget deficit, the country has to borrow from abroad, which shows up as a trade or current account deficit. That's the twin deficits idea. Expect: "if the budget deficit widens and private saving is unchanged, what happens to the trade balance?" It worsens.

### Budget deficits (fiscal policy)
- **Structural vs cyclical:** a cyclical deficit comes from the business cycle. In recessions tax revenue falls and welfare spending rises on their own. A structural deficit is what's left at full employment. Use the structural balance to judge policy stance.
- **Automatic stabilizers:** progressive taxes and unemployment benefits widen the deficit in downturns with no new legislation.
- **Crowding out:** government borrowing pushes up rates and reduces private investment.
- **Ricardian equivalence:** people expect future tax hikes to pay for today's deficit, so they save the tax cut and fiscal policy has no effect. A theory, not a guaranteed outcome.
- **Fiscal multiplier:** \( \frac{1}{1 - MPC(1 - t)} \). The balanced budget multiplier is 1.
- **Lags:** recognition, action and impact lags make discretionary policy hard to time.

Concerns about national debt: higher future taxes that distort incentives, possible default or currency crisis, crowding out, higher interest burden. Arguments against worrying: debt owed to your own citizens is a transfer, borrowing can fund productive investment, Ricardian offsets, deficit spending helps in slack economies, some debt is backed by real assets.

### Trade deficits (trade, BOP and FX)
- **Balance of payments:** current account + capital account + financial account = 0. A current account deficit is financed by a financial account surplus: foreigners buy your assets.
- A deficit isn't automatically bad. It's fine if borrowing funds investment that raises future output; it's a problem if it funds consumption or a budget blowout.

Three ways to analyze a currency move:
1. **Elasticities / Marshall-Lerner:** a depreciation improves the trade balance only if \( \omega_x\varepsilon_x + \omega_m(\varepsilon_m - 1) > 0 \). When trade starts balanced: \( |\varepsilon_x| + |\varepsilon_m| > 1 \).
2. **J-curve:** after a depreciation, the trade balance worsens first (contracts fixed, volumes adjust slowly), then improves.
3. **Absorption approach:** \( BT = Y - A \), where A is domestic spending. A depreciation only helps if income rises relative to spending. At full employment, you need spending cuts.

### Policy mix: Mundell-Fleming (high capital mobility)
- Expansionary fiscal: rates rise, capital flows in, currency appreciates. The trade deficit widens: another route to twin deficits.
- Expansionary monetary: rates fall, currency depreciates.
- Both loose: currency effect is ambiguous.
- Fiscal loose, monetary tight: strongest appreciation.

Persistent current account deficits tend to weaken a currency over time, especially when financed by short-term "hot" money rather than FDI.

### Exam traps
- Mixing up cyclical and structural deficits.
- Assuming a depreciation fixes the trade balance immediately (J-curve).
- Forgetting Marshall-Lerner has to hold for depreciation to help at all.
- Getting the sign wrong in the sector balance identity.

## Market structures: from perfect competition to monopoly

The exam asks you to identify the structure from its features and know how price and output are set.

### The four structures
| | Sellers | Product | Pricing power | Barriers |
| --- | --- | --- | --- | --- |
| Perfect competition | Many | Identical | None | Very low |
| Monopolistic competition | Many | Differentiated | Some | Low |
| Oligopoly | Few | Similar or differentiated | Significant | High |
| Monopoly | One | Unique | Considerable | Very high |

### Profit maximization
Every firm produces where **MR = MC**.
- **Perfect competition:** P = MR = MC. Long-run economic profit is zero; price = minimum ATC.
- **Monopoly:** MR < P, so output is lower and price higher than under competition (deadweight loss). Price discrimination can capture more consumer surplus.
- **Monopolistic competition:** short-run profits are possible; entry pushes long-run economic profit to zero, but P > MC (excess capacity).

### Oligopoly models
- **Kinked demand curve:** rivals match price cuts but not increases, so prices are sticky.
- **Cournot:** firms choose quantities; result lies between monopoly and competition.
- **Stackelberg:** a leader moves first and gains.
- **Dominant firm:** the leader sets price; smaller firms are price takers.
- **Nash equilibrium:** no firm can do better by changing strategy alone. Collusion tends to break down.

### Measuring concentration
- **N-firm concentration ratio:** sum of the largest N firms' market shares. Ignores mergers among the top firms and barriers to entry.
- **Herfindahl-Hirschman Index (HHI):** sum of squared market shares. A merger of two big firms raises it, which the concentration ratio can miss.

### Exam traps
- Short-run shutdown: a firm keeps operating if price ≥ average variable cost. Long-run exit: price < average total cost.
- Elastic demand (many substitutes) means less pricing power.

## Monetary policy: tools, transmission and limits

### Central bank roles and tools
- Roles: monopoly supplier of currency, banker to the government and banks, lender of last resort, regulator, managing reserves and FX.
- Tools: **policy rate**, **reserve requirements**, **open market operations** (buying bonds adds reserves and lowers rates).

### Transmission
A cut in the policy rate lowers short-term market rates, raises asset prices, weakens the currency and improves expectations. Spending and lending rise, and eventually inflation.

### Stance
- **Neutral rate** = trend real growth + inflation target.
- Policy rate above neutral is contractionary; below is expansionary.

### Qualities of an effective central bank
**Independence** (operational and target), **credibility** and **transparency**. Inflation targeting usually comes with a target around 2%.

### Limits
- **Liquidity trap:** people hoard cash at very low rates, so adding money doesn't stimulate.
- **Deflation:** real debt burdens rise and the zero lower bound limits cuts.
- **Quantitative easing:** buying longer-term bonds or other assets when the policy rate is near zero.
- Bond market vigilantes and long-term rates may not follow short rates.

### Monetary vs fiscal interaction
| Fiscal | Monetary | Result |
| --- | --- | --- |
| Loose | Loose | Highly expansionary; public and private sectors both grow |
| Tight | Tight | Lower demand; public and private sectors both shrink |
| Loose | Tight | Higher rates; public sector share of GDP rises |
| Tight | Loose | Lower rates; private sector share of GDP rises |

### Exam traps
- Quantity theory: \( MV = PY \). With V and Y fixed, money growth drives inflation (money neutrality in the long run).
- Fisher effect: nominal rate ≈ real rate + expected inflation (plus a risk premium).

## Business cycles: phases and indicators

### Four phases
1. **Recovery:** output rises from the trough, still below potential. Unemployment stays high; inflation is moderating.
2. **Expansion:** output above trend; hiring rises; inflation picks up; central banks tighten.
3. **Slowdown:** growth decelerates from the peak; inflation still high.
4. **Contraction:** output falls; layoffs; profits drop; inflation eases.

### How things behave
- **Inventories:** the inventory-to-sales ratio rises unexpectedly as a slowdown starts (sales drop before production adjusts), then firms cut production sharply.
- **Capital spending:** firms cut it hard in recessions; orders lead activity.
- **Labor:** firms cut hours before headcount and add overtime before hiring.
- **Unemployment** is a lagging indicator.

### Indicators
- **Leading:** average weekly hours, initial jobless claims, new orders, building permits, stock prices, interest rate spread (10-year minus policy rate), consumer expectations.
- **Coincident:** payroll employment, personal income, industrial production, manufacturing and trade sales.
- **Lagging:** average duration of unemployment, inventory-to-sales ratio, unit labor costs, average prime rate, commercial loans outstanding, consumer credit to income, services CPI.

### Unemployment and inflation types
- Frictional (between jobs), structural (skills mismatch), cyclical (business cycle).
- Discouraged workers fall out of the labor force, which can make unemployment look lower.
- Cost-push vs demand-pull inflation; core inflation excludes food and energy.

### Exam traps
- The unemployment rate is lagging, but initial jobless claims are leading.
- Inventory-to-sales ratio is lagging.

## Exchange rates: cross rates, forwards and interest parity

### Quotes
"USD/EUR = 1.10" means 1.10 USD per 1 EUR (price currency / base currency). The base currency is in the denominator, the one you're pricing.

### Cross rates
Line up the currencies so the common one cancels:
$$\frac{\text{JPY}}{\text{EUR}} = \frac{\text{JPY}}{\text{USD}} \times \frac{\text{USD}}{\text{EUR}}$$

### Percentage change
If USD/EUR rises from 1.10 to 1.21, the euro appreciated 10%. The dollar depreciated by \( 1.10/1.21 - 1 = -9.09\% \), not 10%.

### Forwards and covered interest parity
$$F_{f/d} = S_{f/d} \times \frac{1 + i_f \left(\frac{\text{days}}{360}\right)}{1 + i_d \left(\frac{\text{days}}{360}\right)}$$

Here f is the price currency and d the base currency. The currency with the **higher interest rate trades at a forward discount**. Forward points are F − S, quoted scaled up (often by 10,000).

### Exchange rate regimes
From most to least flexible: independent float, managed float, crawling peg/band, fixed peg, currency board, no separate legal tender (dollarization).

### Capital flows and FX
Capital inflows appreciate the currency. Capital controls are used to slow surges and protect reserves.

### Exam traps
- Writing the formula upside down: the currency in the denominator of the quote takes the denominator interest rate.
- Real exchange rate: nominal rate adjusted by the ratio of price levels.

# Financial Statement Analysis

## Revenue recognition: the five-step model

IFRS 15 and ASC 606 use the same core model.

### Five steps
1. Identify the **contract** with a customer.
2. Identify the separate **performance obligations** (distinct goods or services).
3. Determine the **transaction price**, including variable consideration only if it's highly probable not to reverse.
4. **Allocate** the price to obligations based on relative standalone selling prices.
5. Recognize revenue **when (or as) each obligation is satisfied**: at a point in time when control transfers, or over time.

### Over time vs point in time
Revenue is recognized over time if the customer gets the benefit as you perform, the customer controls the asset as it's built, or the asset has no alternative use and you have a right to payment for work done. Long-term contracts often use input methods (costs incurred to date / total expected costs).

### Principal vs agent
A **principal** controls the goods before transfer and reports gross revenue. An **agent** arranges the sale and reports only the net commission. Revenue differs, profit doesn't.

### Related balance sheet items
- Cash received before performance: **contract liability (unearned revenue)**.
- Revenue recognized before billing: **contract asset**.

### Exam traps
- Gross vs net reporting changes revenue and margins, not net income.
- Bill-and-hold and channel stuffing are revenue quality warning signs.

## Inventories: FIFO, LIFO and the LIFO reserve

### Cost flow methods
- **FIFO:** older costs go to COGS. In rising prices: lower COGS, higher profit, higher taxes, inventory near current cost.
- **LIFO** (US GAAP only, not IFRS): newer costs go to COGS. In rising prices: higher COGS, lower profit and taxes, so **higher cash flow**. Inventory is understated.
- **Weighted average:** in between.

### LIFO reserve
LIFO reserve = FIFO inventory − LIFO inventory.

Convert LIFO to FIFO:
- Inventory: add the LIFO reserve.
- COGS: subtract the **change** in the LIFO reserve.
- Equity: add LIFO reserve × (1 − t); deferred tax liability up by reserve × t.

### LIFO liquidation
When a LIFO firm sells more than it buys, old cheap layers flow into COGS, inflating margins. It isn't sustainable. Watch for a falling LIFO reserve.

### Measurement
- IFRS: lower of cost and **net realizable value**; write-downs can be reversed.
- US GAAP: LIFO and retail method use lower of cost or market; other methods use cost and NRV. **No reversals.**

### Ratio effects (rising prices, LIFO vs FIFO)
LIFO gives lower current ratio, higher inventory turnover, lower gross margin, higher debt-to-equity.

### Exam traps
- In rising prices, LIFO gives higher cash flow (lower taxes), even though profit is lower.
- The direction flips in falling prices.

## Long-lived assets: capitalize or expense, depreciation and impairment

### Capitalizing vs expensing
Capitalizing a cost (vs expensing it):
- Higher assets and equity; lower debt-to-equity.
- Higher income in the first year (and smoother income), lower income later as the asset is depreciated.
- Profitability ratios (ROA, ROE) higher in the first year, lower afterwards.
- **Cash flow:** the outflow sits in **investing** activities, so CFO is higher and CFI lower. Total cash flow is the same.

### Depreciation methods
- Straight-line: (cost − salvage) / useful life.
- Accelerated (double-declining balance): \( \frac{2}{\text{life}} \times \) beginning book value; ignore salvage until the end. Lower early income.
- Units-of-production: tied to usage.

### Intangibles
- Purchased intangibles are capitalized. Indefinite-life intangibles and **goodwill aren't amortized** but are tested for impairment.
- Research is expensed under both standards. **Development** can be capitalized under IFRS once feasibility is shown; generally expensed under US GAAP (software has its own rules).

### Impairment
- **IFRS:** impaired if carrying amount > recoverable amount (higher of fair value less costs to sell and value in use). Reversals allowed (except goodwill).
- **US GAAP:** two steps: recoverability test (undiscounted cash flows), then write down to fair value. **No reversals** for assets held for use.

### Revaluation
IFRS allows the revaluation model; increases go to a revaluation surplus in equity unless they reverse a prior loss through profit. US GAAP doesn't allow upward revaluation.

### Exam traps
- Capitalizing boosts CFO. Analysts may treat capitalized costs as expensed to compare firms.
- Impairments are non-cash; they hit income but not cash flow.

## Income taxes: deferred tax assets and liabilities

Deferred taxes come from **temporary** differences between accounting (book) and tax bases.

### Deferred tax liability (DTL)
Arises when taxable income < pre-tax accounting income now, and will reverse later. Classic cause: **accelerated depreciation for tax**, straight-line for books.

### Deferred tax asset (DTA)
Arises when taxable income > accounting income now. Causes: warranty expenses accrued for books but deductible when paid, tax loss carryforwards, revenue taxed before it's recognized.

### Income tax expense
$$\text{Income tax expense} = \text{Taxes payable} + \Delta DTL - \Delta DTA$$

### Permanent differences
Items that never reverse (tax-exempt interest, non-deductible fines) create no deferred tax. They make the **effective tax rate** differ from the statutory rate.

### Valuation allowance
Under US GAAP, reduce a DTA with a valuation allowance if it's more likely than not that it won't be realized. Rising allowances signal management doubts future profits.

### Rate changes
A tax rate change revalues existing DTAs and DTLs; the adjustment flows through tax expense.

### Analyst view
If a DTL is not expected to reverse (growing capex keeps it rising), treat it as equity, not a liability.

### Exam traps
- Temporary vs permanent: only temporary creates DTL/DTA.
- Higher tax rate: DTL rises (more expense), DTA rises (less expense).

## Cash flow statement: CFO, classification and free cash flow

### Indirect method for CFO
Start with net income, then:
- Add back non-cash charges (depreciation, amortization, impairments).
- Subtract gains on asset sales and add losses (the cash goes to investing).
- **Increase** in operating current assets (receivables, inventory): subtract.
- **Increase** in operating current liabilities (payables, accrued expenses): add.

### IFRS vs US GAAP classification
| Item | US GAAP | IFRS |
| --- | --- | --- |
| Interest paid | CFO | CFO or CFF |
| Interest received | CFO | CFO or CFI |
| Dividends paid | CFF | CFO or CFF |
| Dividends received | CFO | CFO or CFI |
| Taxes paid | CFO | CFO, unless tied to investing or financing |

### Free cash flow
$$FCFF = CFO + Int(1 - t) - FCInv$$
$$FCFE = CFO - FCInv + \text{Net borrowing}$$

### Quality checks
- CFO consistently below net income is a warning sign for earnings quality.
- Stretching payables or selling receivables (factoring) can temporarily boost CFO.

### Exam traps
- Non-cash investing and financing (converting debt to equity, leasing an asset) doesn't appear in the cash flow statement; it's disclosed in notes.
- Gains on sale are subtracted in CFO; the full proceeds show in CFI.

## Financial analysis: DuPont and the key ratios

### Three-part DuPont
$$ROE = \frac{NI}{\text{Sales}} \times \frac{\text{Sales}}{\text{Assets}} \times \frac{\text{Assets}}{\text{Equity}}$$
Net profit margin × asset turnover × financial leverage.

### Five-part DuPont
$$ROE = \frac{NI}{EBT} \times \frac{EBT}{EBIT} \times \frac{EBIT}{\text{Sales}} \times \frac{\text{Sales}}{\text{Assets}} \times \frac{\text{Assets}}{\text{Equity}}$$
Tax burden × interest burden × EBIT margin × asset turnover × leverage.

The tax burden and interest burden are **≤ 1**; a higher value means less is lost to taxes or interest.

### Ratio families
- **Activity:** inventory turnover (COGS / avg inventory), receivables turnover, payables turnover, total asset turnover.
- **Liquidity:** current, quick (cash + short-term marketable investments + receivables) / current liabilities, cash ratio, defensive interval.
- **Solvency:** debt-to-equity, debt-to-capital, interest coverage (EBIT / interest), fixed-charge coverage.
- **Profitability:** gross, operating, net margins, ROA, ROE.

### Cash conversion cycle
DSO + DOH − DPO. Shorter is generally better.

### Exam traps
- ROE can rise purely from more leverage: check the DuPont driver.
- Higher leverage raises ROE only if return on assets exceeds the after-tax cost of debt.

# Corporate Issuers

## Corporate governance: stakeholders and agency conflicts

### Stakeholders
Shareholders, creditors, managers and employees, board of directors, customers, suppliers, government and regulators.

### Principal-agent conflicts
- **Shareholders vs managers:** managers may build empires, take too little risk (to protect their jobs) or too much (with options), or entrench themselves.
- **Controlling vs minority shareholders:** in concentrated ownership, the controlling holder can extract private benefits (related-party deals, dual-class shares).
- **Shareholders vs creditors:** shareholders prefer riskier projects and higher payouts; creditors want safety. Covenants protect creditors.

### Entrenchment
Managers who are hard to remove (staggered boards, poison pills, dual-class shares) may resist value-creating takeovers. Takeover threats are an external governance mechanism.

### Governance mechanisms
- **Internal:** board of directors with independent members, separate CEO and chair, audit, compensation and nomination committees, shareholder voting (including cumulative voting, which helps minority holders elect directors).
- **External:** shareholder activism, proxy contests, takeovers, laws and regulators, media, credit rating agencies.

### ESG integration
Approaches include negative screening, positive screening, thematic investing, impact investing and ESG integration into valuation.

### Exam traps
- Dual-class structures give founders control; they're a governance risk for minority shareholders.
- Debt covenants protect creditors, not shareholders.
- Cumulative voting helps **minority** holders.

## Capital investment: NPV, IRR and project decisions

### Decision rules
- **NPV** = PV of cash inflows − initial investment. Accept if NPV > 0. NPV is the expected increase in shareholder wealth.
- **IRR**: the discount rate making NPV = 0. Accept if IRR > required return.

### When NPV and IRR conflict
For mutually exclusive projects with different scale or timing of cash flows, they can rank projects differently. **Follow NPV.** IRR assumes reinvestment at the IRR, NPV at the cost of capital, which is more realistic.

### IRR problems
- Unconventional cash flows (sign changes more than once) can give multiple IRRs or none.
- IRR ignores scale.

### Cash flows to use
- **Incremental, after-tax** cash flows.
- Include opportunity costs and externalities (cannibalization).
- **Exclude sunk costs and financing costs** (interest is captured in the discount rate).

### Return on invested capital
ROIC = after-tax operating profit / average invested capital. Value is created when ROIC > cost of capital.

### Real options
Timing, abandonment, expansion and flexibility options add value that a static NPV misses.

### Exam traps
- Don't subtract interest from project cash flows.
- Sunk costs (a feasibility study already paid for) are irrelevant.

## Cost of capital: WACC and its components

$$WACC = w_d\,r_d(1 - t) + w_p\,r_p + w_e\,r_e$$

Use **target** (or market value) weights, not book values where avoidable.

### Cost of debt
- Use the **YTM** on existing debt, or a matrix price / debt rating approach if not traded.
- After-tax because interest is tax-deductible.

### Cost of preferred
\( r_p = D_p / P_p \).

### Cost of equity
- **CAPM:** \( r_e = R_f + \beta[E(R_m) - R_f] \).
- **Dividend discount model:** \( r_e = D_1 / P_0 + g \), where \( g = b \times ROE \) (retention ratio × ROE).
- **Bond yield plus risk premium:** firm's bond yield + 3% to 5%.
- Country risk premium is added for emerging markets.

### Beta for a project
Unlever a comparable firm's beta, then relever at your capital structure:
$$\beta_A = \beta_E \times \frac{1}{1 + (1 - t)\frac{D}{E}} \qquad \beta_E = \beta_A\left[1 + (1 - t)\frac{D}{E}\right]$$

### Marginal cost of capital
The MCC schedule steps up as a firm raises more capital; the optimal capital budget is where it meets the investment opportunity schedule.

### Flotation costs
Best practice: adjust the project's initial outlay, not the cost of capital.

### Exam traps
- Use the after-tax cost of debt; don't take the tax shield on preferred.
- Use market values, not book values, for the weights.

## Capital structure: Modigliani-Miller and trade-off theory

### MM without taxes
- **Proposition I:** firm value doesn't depend on capital structure.
- **Proposition II:** cost of equity rises linearly with leverage, so WACC stays constant.
$$r_e = r_0 + (r_0 - r_d)\frac{D}{E}$$

### MM with taxes
- Value rises with debt because of the tax shield: \( V_L = V_U + tD \).
- WACC falls as leverage rises. Taken alone, this implies 100% debt.

### Static trade-off theory
Add **costs of financial distress** (direct: legal fees; indirect: lost customers, suppliers' terms). The optimal capital structure is where the marginal tax benefit equals the marginal distress cost. WACC is U-shaped.

### Pecking order theory
Because of information asymmetry, managers prefer **internal funds first, then debt, then equity last**. Issuing equity signals that management thinks shares are overvalued.

### Agency costs
Debt disciplines managers by reducing free cash flow (Jensen's free cash flow hypothesis).

### Life cycle view
- Start-ups: equity-financed, few assets to borrow against.
- Growth firms: still mostly equity.
- Mature firms: stable cash flows, more debt capacity.

### Exam traps
- MM Prop II: equity gets more expensive with leverage, but the WACC doesn't change (no taxes).
- Pecking order explains why equity issuance is the last resort, and why announcements often lower the share price.

## Working capital and liquidity management

### Cash conversion cycle
$$CCC = DOH + DSO - DPO$$
Days of inventory on hand + days sales outstanding − days payables outstanding.

### Primary and secondary sources of liquidity
- **Primary:** cash, short-term funds, cash flow from operations, bank lines of credit.
- **Secondary:** renegotiating debt, liquidating assets, filing for bankruptcy protection. Using these signals deteriorating finances.

### Drags and pulls on liquidity
- **Drags** slow inflows: uncollected receivables, obsolete inventory, tight credit.
- **Pulls** speed up outflows: paying vendors early, reduced credit lines.

### Cost of trade credit
Not taking a discount on "2/10 net 30" is expensive:
$$\left(1 + \frac{0.02}{0.98}\right)^{365/20} - 1 \approx 44.6\%$$

### Short-term funding choices
Uncommitted and committed lines of credit, revolving credit, secured loans, factoring, commercial paper (large creditworthy firms, usually with a backup line).

### Working capital approaches
- **Conservative:** more permanent (long-term) financing, high current assets. Lower risk, higher cost.
- **Aggressive:** more short-term financing, lean current assets. Higher refinancing risk, lower cost.

### Exam traps
- Forgoing a trade discount is usually more costly than a bank line.
- A shorter CCC means less working capital to finance.

# Equity Investments

## Market efficiency: weak, semi-strong and strong forms

### Three forms
- **Weak form:** prices reflect all past market data. Technical analysis can't earn abnormal returns.
- **Semi-strong form:** prices reflect all **public** information. Fundamental analysis of public data can't earn abnormal returns.
- **Strong form:** prices reflect public and private information. Even insiders can't earn abnormal returns. Not supported by evidence (insiders do profit).

Each form includes the ones below it.

### Implications
- If markets are semi-strong efficient, passive investing makes sense.
- Even in efficient markets, portfolio managers still have a role: matching the portfolio to the client's risk and tax needs.

### Factors affecting efficiency
Number of participants, information availability, limits to trading (short-sale restrictions), transaction and information costs.

### Anomalies
- **Time series:** January effect, momentum, overreaction.
- **Cross-sectional:** size effect, value effect.
- **Other:** closed-end fund discounts, earnings surprise drift, IPO underperformance.
Many disappear after discovery or after adjusting for risk and costs.

### Behavioral finance
Loss aversion, herding, overconfidence and information cascades help explain anomalies.

### Exam traps
- Abnormal returns must be risk-adjusted and after costs to count against efficiency.
- Event studies test semi-strong efficiency.

## Equity valuation: dividend discount and multiples

### Three model types
- **Present value models:** DDM, free cash flow to equity.
- **Multiplier models:** P/E, P/B, P/S, EV/EBITDA.
- **Asset-based models:** market value of assets minus liabilities.

### Gordon growth model
$$V_0 = \frac{D_1}{r - g} = \frac{D_0(1 + g)}{r - g}$$
Requires r > g; g = retention ratio × ROE.

### Multistage DDM
Discount high-growth dividends year by year, then use Gordon for the terminal value at the start of stable growth. Discount that terminal value back the right number of years.

### Preferred stock
\( V = D_p / r_p \) (a perpetuity).

### Justified P/E
$$\frac{P_0}{E_1} = \frac{D_1/E_1}{r - g}$$
Higher payout, higher g, or lower r raise the justified P/E.

### Enterprise value
EV = market value of equity + debt + preferred − cash. EV/EBITDA is useful for comparing firms with different leverage.

### Exam traps
- Use D₁, not D₀, in the numerator.
- The terminal value from Gordon is at time n when using \( D_{n+1} \); discount it n periods.
- If market price < intrinsic value, the stock is undervalued.

## Market organization: margin, leverage and orders

### Margin transactions
- Leverage ratio = 1 / initial margin. 50% initial margin means 2× leverage.
- Return on a margin purchase is magnified both ways, before interest and commissions.

### Margin call price
$$P = P_0 \times \frac{1 - \text{initial margin}}{1 - \text{maintenance margin}}$$

### Order types
- **Market order:** immediate execution at the best available price.
- **Limit order:** buy at or below / sell at or above a price. Risk: no execution.
- **Stop order:** becomes a market order when the stop price is hit. A stop-loss sell is placed below the current price.
- Validity: day, good-till-cancelled, fill or kill, good on close.

### Market types
- **Quote-driven (dealer)** markets: trade with dealers.
- **Order-driven** markets: orders matched by rules (price, display, time priority).
- **Brokered** markets: for unique assets like real estate.

### A well-functioning market
Timely information, liquidity (low cost, depth), and **informational efficiency**: prices reflect fundamentals.

### Exam traps
- Short sellers lose if the price rises and must pay dividends to the lender.
- Stop-loss orders don't guarantee the stop price.

## Security market indexes: weighting methods

### Weighting schemes
- **Price-weighted:** sum of prices / divisor. High-priced stocks dominate. A split changes the divisor. Example: Dow Jones Industrial Average, Nikkei 225.
- **Equal-weighted:** each stock gets the same weight. Needs frequent rebalancing; tilts toward small caps.
- **Market-cap weighted:** weights by market value. Self-rebalancing; tilts toward large and possibly overvalued stocks. **Float-adjusted** excludes shares not available to trade.
- **Fundamental-weighted:** weights by earnings, sales, book value. Contrarian (value) tilt.

### Price return vs total return
Total return includes dividends and other income. Over long periods the gap is large.

### Rebalancing and reconstitution
- **Rebalancing:** reset weights (mainly equal-weighted).
- **Reconstitution:** change which securities are in the index.

### Uses
Gauge market sentiment, proxy for market return in CAPM/beta, benchmarks, model portfolios, basis for index funds and ETFs.

### Fixed income index issues
Huge, heterogeneous universe; many bonds trade rarely, so pricing relies on dealer quotes; constant turnover as bonds mature.

### Exam traps
- A stock split doesn't change a price-weighted index level, but does change the divisor and the stock's future weight.
- Market-cap weighting overweights stocks that have gone up.

## Industry analysis: five forces and the life cycle

### Porter's five forces
1. **Threat of new entrants:** high barriers protect profits.
2. **Bargaining power of suppliers:** concentrated or unique suppliers squeeze margins.
3. **Bargaining power of buyers:** concentrated buyers or low switching costs hurt pricing.
4. **Threat of substitutes:** close substitutes cap prices.
5. **Rivalry among competitors:** high fixed costs, slow growth and undifferentiated products intensify it.

### Industry life cycle
1. **Embryonic:** slow growth, high prices, high risk.
2. **Growth:** rapid demand growth, falling prices, low competition, improving profits.
3. **Shakeout:** growth slows, competition intensifies, weaker firms exit.
4. **Mature:** slow growth, consolidation, high barriers, stable profits.
5. **Decline:** negative growth, excess capacity, price cuts.

### Classifications
- **Cyclical:** demand tied to the economy (autos, construction, luxury).
- **Defensive (non-cyclical):** stable demand (utilities, consumer staples, health care).
- GICS and similar systems classify by principal business activity.

### Competitive strategies
Cost leadership vs differentiation; a firm stuck in the middle tends to underperform.

### Exam traps
- Shakeout comes **after** growth and before maturity.
- Low fixed costs and differentiated products reduce rivalry.

# Fixed Income

## Bond pricing and yield measures

### Price from yield
$$P = \sum_{t=1}^{N} \frac{C}{(1 + r)^t} + \frac{FV}{(1 + r)^N}$$

- Coupon > YTM: premium. Coupon < YTM: discount. Equal: par.
- Price and yield move inversely; the relationship is **convex**.
- For the same yield change, longer maturity and lower coupon mean bigger price changes.

### Between coupon dates
Full (dirty) price = flat (clean) price + accrued interest. Quotes are usually flat prices.

### Yield measures
- **YTM:** IRR assuming held to maturity, no default, coupons reinvested at the YTM.
- **Current yield:** annual coupon / flat price.
- **Yield to call / yield to worst:** for callable bonds, the lowest of YTM and yields to each call date.
- **Bond equivalent yield vs effective annual yield:** semiannual-pay bonds quote a stated annual rate (2 × semiannual rate).

### Floating-rate notes
Coupon = reference rate + quoted margin. If the required margin (discount margin) equals the quoted margin, the FRN prices at par on reset dates.

### Money market yields
Discount rate basis (T-bills) understates the true yield; add-on basis is closer to an investor's return. Convert both to a bond-equivalent yield to compare.

### Exam traps
- The YTM assumption about reinvesting at the YTM is why realized returns differ.
- Constant-yield price trajectory: premium bonds fall toward par, discount bonds rise to par.

## Duration and convexity

### Duration measures
- **Macaulay duration:** weighted average time to receive cash flows (in years).
- **Modified duration:** \( \frac{MacDur}{1 + r} \). Approximate % price change for a 1% change in yield.
- **Effective duration:** for bonds with embedded options, using curve shifts:
$$EffDur = \frac{PV_{-} - PV_{+}}{2 \times \Delta\text{Curve} \times PV_0}$$
- **Money duration** = ModDur × full price; **PVBP** = price change for a 1 bp shift.

### Price change estimate
$$\%\Delta P \approx -\text{ModDur} \times \Delta y + \tfrac{1}{2} \times \text{Convexity} \times (\Delta y)^2$$

Positive convexity: prices rise more when yields fall than they drop when yields rise.

### What drives duration
- Longer maturity: higher (usually).
- Higher coupon: lower.
- Higher yield: lower.
- A zero's Macaulay duration = its maturity.
- **Callable bonds** have negative convexity at low yields (price capped near the call price). **Putable bonds** have more upside protection.

### Duration and investment horizon
- If horizon = Macaulay duration, reinvestment and price risk roughly offset (immunization).
- Horizon > MacDur: reinvestment risk dominates. Horizon < MacDur: market price risk dominates.
- **Duration gap** = MacDur − investment horizon.

### Exam traps
- Use effective duration for bonds with options; modified duration assumes cash flows don't change.
- Convexity adjustment is always positive for option-free bonds.

## Credit risk: expected loss, spreads and ratings

### Expected loss
$$EL = PD \times LGD$$
LGD = (1 − recovery rate) × exposure. The yield spread compensates for EL plus liquidity and a risk premium.

### Seniority and recovery
Recovery rises with seniority: first lien > senior secured > senior unsecured > subordinated. In bankruptcy, **priority of claims** generally holds, but negotiated outcomes can deviate.

### Ratings
- Investment grade: BBB−/Baa3 and above. High yield: below that.
- **Notching:** issue ratings can sit above or below the issuer rating depending on seniority (structural subordination at holdco level).
- Ratings are slow to change; spreads move first.

### The four Cs (plus)
**Capacity** (ability to pay: cash flows, leverage, coverage), **collateral**, **covenants**, **character** (management, governance). Some versions add capital and conditions.

### Credit ratios
EBITDA / interest, FFO / debt, debt / EBITDA, debt / capital. Higher coverage and lower leverage mean better quality.

### Spread changes
Spread widening hurts price: \( \%\Delta P \approx -\text{ModDur} \times \Delta \text{spread} \). Spreads widen in recessions and in flights to quality.

### Exam traps
- High-yield analysis focuses more on liquidity, debt structure and recovery.
- Sovereign debt: local-currency default risk is usually lower than foreign-currency risk.

## Term structure: spot, forward and par curves

### Three curves
- **Spot (zero) curve:** yields on zero-coupon bonds. The right way to discount each cash flow.
- **Par curve:** coupon rates at which bonds price at par for each maturity.
- **Forward curve:** implied future one-period rates.

### Forwards from spots
$$(1 + S_2)^2 = (1 + S_1)(1 + {}_1f_1)$$
Generally: \( (1 + S_A)^A (1 + {}_{A}f_{B-A})^{B-A} = (1 + S_B)^B \).

If the spot curve slopes up, forwards sit above spots; spots sit above par yields.

### Yield curve theories
- **Pure expectations:** forwards are unbiased predictors of future spot rates.
- **Liquidity preference:** investors demand a term premium for longer maturities, so an upward slope can occur even with flat expectations.
- **Segmented markets:** separate supply and demand by maturity.
- **Preferred habitat:** investors have preferred maturities but will move for enough premium.

### Spreads
- **G-spread:** over a government bond yield.
- **I-spread:** over the swap rate.
- **Z-spread:** constant spread added to each spot rate so PV = price.
- **OAS:** Z-spread minus the option value (for callables). OAS < Z-spread for callable bonds.

### Exam traps
- Inverted curves are a classic recession signal.
- A bond's YTM is a weighted average of spot rates; it isn't any single spot rate.

## Securitization: ABS, MBS and prepayment risk

### Why securitize
Banks sell loans to a **special purpose entity (SPE)** that issues securities. Benefits: frees bank capital, gives investors access to pooled assets, improves liquidity. The SPE is **bankruptcy-remote** from the originator.

### Credit enhancement
- **Internal:** subordination (senior/mezzanine/equity tranches), overcollateralization, excess spread, reserve accounts.
- **External:** guarantees, letters of credit.
- Losses hit the most junior tranche first (the waterfall).

### Mortgage-backed securities
- **Prepayment risk** is the key risk: homeowners refinance when rates fall (contraction risk) and pay slowly when rates rise (extension risk).
- Measured by SMM (monthly) and CPR (annual); PSA benchmark ramps up then levels off.
- **Pass-throughs** share cash flows pro rata. **CMOs** redistribute prepayment risk across tranches:
  - **Sequential pay:** short tranches get principal first.
  - **PAC tranches** have a protected schedule; **support (companion) tranches** absorb the variability.

### Other ABS
Auto loans (amortizing), credit card receivables (non-amortizing, with a lockout period), CDOs (pools of debt, tranched).

### Covered bonds
Issued by banks, backed by a segregated cover pool; investors also have recourse to the issuing bank (dual recourse). The pool is dynamic: bad assets get replaced.

### Exam traps
- Falling rates are bad for MBS investors: contraction risk, reinvestment at lower rates.
- Support tranches carry the most prepayment risk.

# Derivatives

## Forwards and futures: pricing and cost of carry

### No-arbitrage forward price
$$F_0(T) = S_0(1 + r)^T$$
With carry benefits (dividends, coupons, convenience yield) and costs (storage):
$$F_0(T) = (S_0 - PV_{benefits} + PV_{costs})(1 + r)^T$$
Continuous version: \( F_0 = S_0 e^{(r + c - i)T} \).

### Value of a forward
At inception the value is **zero**. Later, for the long:
$$V_t = S_t - PV_{benefits} + PV_{costs} - \frac{F_0(T)}{(1 + r)^{T - t}}$$

### Forwards vs futures
| | Forwards | Futures |
| --- | --- | --- |
| Trading | OTC, customized | Exchange, standardized |
| Credit risk | Counterparty | Clearinghouse |
| Settlement | At maturity | Daily mark-to-market |
| Margin | Usually none | Initial and maintenance |

If interest rates and futures prices are positively correlated, the long prefers futures (gains reinvested at higher rates), so futures prices exceed forward prices.

### Margin calls
If the margin account falls below maintenance, the trader must deposit enough to restore **initial** margin (variation margin).

### Forward rate agreements (FRAs)
An FRA locks in a future interest rate. The long gains if rates rise.

### Exam traps
- A forward has zero value at initiation, but the forward price isn't zero.
- Variation margin restores initial margin, not maintenance margin.

## Options: payoffs, moneyness and put-call parity

### Payoffs at expiry
- Call: \( \max(0, S_T - X) \). Put: \( \max(0, X - S_T) \).
- Profit = payoff − premium (for the buyer).
- Long call breakeven: X + premium. Long put breakeven: X − premium.
- Maximum loss for a buyer = premium. A short call has unlimited loss.

### Moneyness
- Call in the money if S > X; put in the money if S < X.
- **Intrinsic value** = payoff if exercised now; **time value** = premium − intrinsic value.

### What raises option values
| Factor ↑ | Call | Put |
| --- | --- | --- |
| Underlying price | ↑ | ↓ |
| Exercise price | ↓ | ↑ |
| Time to expiry | ↑ | ↑ (usually) |
| Volatility | ↑ | ↑ |
| Risk-free rate | ↑ | ↓ |
| Income from underlying | ↓ | ↑ |

### Put-call parity
$$S_0 + p_0 = c_0 + \frac{X}{(1 + r)^T}$$
Protective put = fiduciary call. Rearrange to create synthetic positions, e.g., synthetic call = stock + put − bond.

### Put-call-forward parity
\( \frac{F_0(T)}{(1 + r)^T} + p_0 = c_0 + \frac{X}{(1 + r)^T} \).

### Strategies
- **Covered call:** long stock + short call. Income, capped upside.
- **Protective put:** long stock + long put. Floor on losses.

### Exam traps
- Early exercise of an American call on a non-dividend-paying stock is never optimal.
- Put-call parity applies to European options.

## Swaps: what they are and how they're valued

### Interest rate swap
- One party pays fixed, the other floating, on a notional that isn't exchanged.
- **Pay-fixed** gains when rates rise.
- A swap is equivalent to a series of FRAs, or to long a floating-rate bond and short a fixed-rate bond (for the fixed payer).

### Swap rate
The fixed rate that makes the swap's value zero at inception:
$$\text{Swap rate} = \frac{1 - PV_N}{\sum_{i=1}^{N} PV_i}$$
where \( PV_i \) are discount factors from spot rates.

### Value after inception
The value changes as rates move. For the fixed payer: value ≈ PV of (current swap rate − original fixed rate) × notional over remaining periods.

### Other swaps
- **Currency swap:** usually exchanges notional at start and end; payments in two currencies.
- **Equity swap:** one leg pays an equity return.
- **Credit default swap (CDS):** protection buyer pays a premium; seller pays on a credit event.

### Uses
Convert floating-rate debt to fixed (or vice versa), manage duration, hedge currency exposure.

### Exam traps
- Swaps are firm commitments, like forwards; both sides have obligations.
- The notional amount of an interest rate swap isn't exchanged.

## Binomial option pricing and replication

### One-period binomial model
The stock goes up to \( S^+ = uS_0 \) or down to \( S^- = dS_0 \).

**Risk-neutral probability:**
$$\pi = \frac{1 + r - d}{u - d}$$

**Option value:**
$$c_0 = \frac{\pi c^+ + (1 - \pi) c^-}{1 + r}$$

The actual probability of an up move doesn't matter.

### Replication and hedge ratio
$$h = \frac{c^+ - c^-}{S^+ - S^-}$$
A portfolio of h shares and a short call is riskless and earns the risk-free rate. If the market call price differs from the model value, arbitrage exists.

### Why risk-neutral works
Because the option can be replicated with the underlying and borrowing, its price can't depend on investor risk preferences.

### Exam traps
- Discount expected payoffs at the risk-free rate, not the expected stock return.
- For a put, the hedge ratio is negative (buy shares and buy the put to hedge).

# Alternative Investments

## Fee structures: management fees, hurdles and high-water marks

### Typical structure
"2 and 20": a 2% management fee on assets plus a 20% incentive fee on profits.

### Key features
- **Hurdle rate:** the fund must beat this return before incentive fees are paid.
  - **Hard hurdle:** incentive fee only on returns above the hurdle.
  - **Soft hurdle:** once the hurdle is cleared, incentive fee on all returns.
- **High-water mark:** incentive fees only on gains above the highest previous net asset value. Prevents being paid twice for recovering the same losses.
- **Catch-up clause:** lets the GP receive 100% of returns above the hurdle until it has its full share.

### Calculation order (check the question)
Incentive fees can be calculated net of management fees or independently. Read carefully.

### Waterfalls in private equity
- **Whole-of-fund (European):** GP gets carry only after LPs get back all capital plus the preferred return. LP-friendly.
- **Deal-by-deal (American):** carry on each deal; GP-friendly.
- **Clawback** lets LPs reclaim excess carry paid earlier.

### Exam traps
- In a year after a loss, a high-water mark can mean no incentive fee even with a positive return.
- Fees reduce returns a lot; net returns are what investors get.

## Private equity and private credit

### Private equity stages
- **Venture capital:** pre-seed, seed, early stage, later stage. High risk, minority stakes.
- **Growth equity:** minority stakes in established, growing companies.
- **Leveraged buyouts (LBOs):** acquire mature firms with heavy debt. Management buyouts (MBOs) are one type.

### Value creation in LBOs
Operational improvements, financial engineering (leverage, tax shields), better governance and incentives.

### Exit routes
Trade sale (to a strategic buyer), IPO, secondary sale (to another PE fund), recapitalization (borrow to pay a dividend), write-off.

### Fund structure
- Limited partnership: GP manages; LPs provide capital and have limited liability.
- **Committed capital** is drawn down over time (capital calls). J-curve: early returns negative from fees and investment, positive later.

### Private credit
Direct lending, mezzanine debt (subordinated, often with warrants), venture debt, distressed debt. Higher yields, illiquidity premium.

### Valuation
Hard to value because there are no market prices; NAVs are stale and smoothed, which understates volatility and correlation.

### Exam traps
- Reported PE returns look less volatile than they really are.
- Mezzanine debt sits between senior debt and equity.

## Real estate: valuation approaches and investment forms

### Four quadrants
| | Public | Private |
| --- | --- | --- |
| **Equity** | REITs, REOCs | Direct ownership, private funds |
| **Debt** | MBS | Mortgages, private loans |

### Valuation approaches
1. **Income approach:**
   - Direct capitalization: \( V = \frac{NOI_1}{\text{cap rate}} \).
   - Discounted cash flow.
   - Cap rate ≈ discount rate − growth rate.
2. **Cost approach:** replacement cost of building + land value − depreciation and obsolescence.
3. **Sales comparison approach:** recent sales of similar properties, adjusted for differences.

### NOI
NOI = rental income + other income − vacancy and collection losses − operating expenses. **Excludes** financing costs and income taxes.

### REIT valuation
- **FFO** = net income + depreciation − gains on property sales.
- **AFFO** = FFO − recurring capital expenditures (and straight-line rent adjustments). A better measure of distributable cash.
- Net asset value approach.

### Characteristics
Large, indivisible, illiquid, heterogeneous, high transaction costs. Appraisal-based indexes smooth returns and understate volatility.

### Exam traps
- A higher cap rate means a lower value.
- NOI excludes debt service.

## Commodities: futures, contango and roll yield

### Return sources on a commodity futures position
$$\text{Total return} = \text{Price return} + \text{Roll yield} + \text{Collateral return}$$

- **Price return:** change in futures prices.
- **Roll yield:** from rolling expiring contracts into later ones.
- **Collateral return:** interest on the margin/collateral (often T-bills).

### Term structure
- **Backwardation:** futures price < spot price. Rolling earns **positive** roll yield (sell the expiring higher contract, buy cheaper longer one).
- **Contango:** futures price > spot price. Negative roll yield.

### Theories
- **Insurance theory:** producers hedge by selling futures, so speculators earn a premium; backwardation is normal.
- **Hedging pressure:** both producers (short) and consumers (long) hedge; direction depends on who dominates.
- **Theory of storage:** futures price ≈ spot × (1 + r) + storage costs − convenience yield. High inventories → contango; scarce supply → high convenience yield → backwardation.

### Characteristics
Commodities have low correlation with stocks and bonds and can hedge inflation. Spot returns are volatile and driven by supply shocks.

### Exam traps
- Backwardation = positive roll yield, contango = negative roll yield.
- Convenience yield is a benefit of holding the physical good.

# Portfolio Management

## CAPM, the CML and the SML

### Capital market line (CML)
Combines the risk-free asset and the market portfolio:
$$E(R_p) = R_f + \frac{E(R_m) - R_f}{\sigma_m}\sigma_p$$
Uses **total risk** (σ). Applies to efficient portfolios only.

### Systematic vs unsystematic risk
- Diversification removes unsystematic (firm-specific) risk.
- Investors are rewarded only for **systematic risk**, measured by beta.

### Beta
$$\beta_i = \frac{\text{Cov}(R_i, R_m)}{\sigma_m^2} = \rho_{i,m}\frac{\sigma_i}{\sigma_m}$$

### Security market line (SML) / CAPM
$$E(R_i) = R_f + \beta_i[E(R_m) - R_f]$$
Applies to **any** asset or portfolio.

### Using the SML
- Stock **above** the SML: expected return > required return. Undervalued: buy.
- Stock **below** the SML: overvalued: sell.

### CAPM assumptions
Risk-averse, utility-maximizing investors; frictionless markets; same single-period horizon; homogeneous expectations; infinitely divisible assets; investors are price takers.

### Exam traps
- CML: σ on the x-axis, efficient portfolios. SML: β on the x-axis, all securities.
- A stock with β = 0 should earn the risk-free rate even if its σ is high.

## Risk aversion, utility and the optimal portfolio

### Utility function
$$U = E(r) - \tfrac{1}{2}A\sigma^2$$
- A > 0: risk-averse; A = 0: risk-neutral; A < 0: risk-seeking.
- A higher A means steeper indifference curves.

### Efficient frontier
- **Minimum-variance frontier:** lowest risk for each expected return.
- **Global minimum-variance portfolio:** the leftmost point.
- **Efficient frontier:** the upper part of the frontier above the global minimum-variance portfolio.

### Two-fund separation
With a risk-free asset, every investor holds the same risky portfolio (the **tangency / optimal risky portfolio**) and adjusts risk by mixing with the risk-free asset.

### Optimal portfolio
Where the investor's highest indifference curve is tangent to the **capital allocation line**. More risk-averse investors hold more of the risk-free asset.

### Diversification
Correlation below +1 lowers portfolio risk. As the number of assets grows, portfolio variance approaches the average covariance.

### Exam traps
- Optimal **risky** portfolio is the same for everyone; the **optimal portfolio** differs by risk aversion.
- Lower correlation gives more diversification benefit; correlation of −1 can eliminate risk entirely for two assets.

## Performance measures: Sharpe, Treynor, M² and alpha

| Measure | Formula | Risk used |
| --- | --- | --- |
| Sharpe ratio | \( \frac{R_p - R_f}{\sigma_p} \) | Total |
| Treynor ratio | \( \frac{R_p - R_f}{\beta_p} \) | Systematic |
| M² | \( R_f + (R_p - R_f)\frac{\sigma_m}{\sigma_p} \), compared with \( R_m \) | Total |
| Jensen's alpha | \( R_p - [R_f + \beta_p(R_m - R_f)] \) | Systematic |

### When to use which
- **Sharpe and M²:** for a portfolio that is the investor's whole wealth (total risk matters). M² gives the same ranking as Sharpe, but in percentage-return terms against the market.
- **Treynor and Jensen's alpha:** for a well-diversified portfolio that is part of a larger portfolio.

### Interpretation
- Positive alpha: the manager beat the CAPM-required return.
- M² > 0: outperformed the market after adjusting to market total risk.

### Exam traps
- Sharpe and Treynor can rank portfolios differently if one isn't well diversified.
- Sharpe ratio isn't affected by leverage with the risk-free asset; M² uses that fact.

## The investment policy statement: objectives and constraints

### Components of an IPS
Client description, purpose, duties and responsibilities, procedures to update, **investment objectives**, **constraints**, guidelines, evaluation and review, appendices (strategic asset allocation, rebalancing).

### Objectives
- **Return:** required (to meet goals) and desired.
- **Risk:** combines **ability** (time horizon, wealth, liquidity needs, income stability) and **willingness** (psychological). If they conflict, the advisor generally goes with the **lower** one and educates the client.

### Constraints (TTLLU)
- **Time horizon**
- **Taxes**
- **Liquidity**
- **Legal and regulatory**
- **Unique circumstances** (ESG preferences, concentrated holdings)

### Strategic asset allocation
Defines target weights to asset classes based on the IPS. Asset classes should be internally similar and have low correlation with each other.

### Rebalancing
Calendar or percentage-of-portfolio range rebalancing.

### Exam traps
- Ability vs willingness conflict: choose the more conservative.
- Liquidity needs and a short horizon lower **ability** to take risk.

## Behavioral biases: cognitive errors vs emotional biases

### Cognitive errors (easier to correct with education)
**Belief perseverance:**
- **Conservatism:** slow to update on new information.
- **Confirmation:** seeking information that supports existing beliefs.
- **Representativeness:** classifying new information by past patterns (base-rate neglect).
- **Illusion of control:** thinking you can influence outcomes.
- **Hindsight:** believing past events were predictable.

**Information-processing:**
- **Anchoring and adjustment:** sticking to an initial number.
- **Mental accounting:** treating money differently by source or purpose.
- **Framing:** answers change with how a question is posed.
- **Availability:** judging likelihood by how easily examples come to mind.

### Emotional biases (harder to correct; often accommodated)
- **Loss aversion:** losses hurt more than equal gains feel good; holding losers too long, selling winners too early (disposition effect).
- **Overconfidence:** overestimating knowledge and ability; trading too much, under-diversifying.
- **Self-control:** favoring short-term spending over long-term goals.
- **Status quo:** doing nothing.
- **Endowment:** valuing what you own more than you'd pay for it.
- **Regret aversion:** avoiding decisions that might later be regretted (herding).

### Exam traps
- Overconfidence has cognitive elements but is classified as **emotional** in the curriculum.
- The response: moderate (correct) cognitive biases, adapt to emotional ones.
