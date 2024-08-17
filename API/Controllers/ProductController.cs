using API.Data;
using API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ProductController (DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        [HttpGet]
        [EnableCors("AllowReactApp")] 
         public async Task<IActionResult> Products()
         {
            return Ok(await _dataContext.Products.ToListAsync());
         }

         [HttpPost]
         public async Task<IActionResult> AddProduct(Product newProduct)
         {
            if (newProduct is null)
            {
                return BadRequest("JSON is null");
            }

            await _dataContext.Products.AddAsync(newProduct);
            await _dataContext.SaveChangesAsync();
            return Ok("Product is Added");
         }

        [HttpGet("{Id}")] 
         public async Task<IActionResult> GetProductById(int Id)
         {
            var product = await _dataContext.Products.FindAsync(Id);
            if (product is null)
            {
                return NotFound();
            } 
            
            return Ok(product);
         }

         [HttpPut("{Id}")]
         public async Task<IActionResult> UpdateProduct(int Id, Product product)
         {
            if (Id != product.Id)
            {
                return NotFound("Product Not found by Id");
            }

            _dataContext.Entry(product).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            return Ok(product);
         }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product=await _dataContext.Products.FindAsync(id);
            if(product==null)
            {
                return NotFound();
            }
            _dataContext.Products.Remove(product);
            await _dataContext.SaveChangesAsync();
            return Ok(product);
        }

    }
}