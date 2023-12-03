use anchor_lang::prelude::*;

declare_id!("Fbso5qpyS8JED3abfXYYwFHSqToCb8fBGDssphiXgTPV");

#[program]
pub mod hello_anchor_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        // if my_account.count == 0 {
        // //    TODO throw an eror
        // }
        my_account.count -= 1;
        Ok(())
    }

    pub fn update(ctx: Context<Set>, count: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.count = count;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer=user,space=8+8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct Set<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    count: u64,
}
