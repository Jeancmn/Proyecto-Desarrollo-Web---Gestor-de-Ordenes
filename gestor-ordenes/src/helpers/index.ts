export function formatCurrency(quantity : number){
    return Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quantity)
}