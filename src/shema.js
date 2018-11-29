import { schema } from 'normalizr';

// Define ticker schema
const tickerShema = new schema.Entity('tickers', {});

// Define portfolio_weight schema
const weightPortfolioShema = new schema.Entity('weight_portfolios', {
    ticker: tickerShema
  });
  
// Define a portfolio schema
const portfolioShema = new schema.Entity('portfolios', {
    weight_portfolio: [weightPortfolioShema]
});

export { tickerShema, weightPortfolioShema, portfolioShema };