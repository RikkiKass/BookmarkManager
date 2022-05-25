using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private string _connectionString;
        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Constr");
        }
        [Route("addbookmark")]
        [HttpPost]
        [Authorize]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }
        [Route("getpopularbookmarks")]
        [HttpGet]
        public List<BookmarkCount> GetPopularBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetPopularBookmarks();
        }
        [Route("getmybookmarks")]
        [HttpGet]
        [Authorize]
        public List<Bookmark> GetMyBookmarks()
        {

            var repo = new BookmarkRepository(_connectionString);
            var userRepo = new UserRepository(_connectionString);
            int userId = userRepo.GetUserByEmail(User.Identity.Name).Id;
            return repo.GetMyBookmarks(userId);
        }
        [Route("updatebookmark")]
        [HttpPost]
        [Authorize]
        public void UpdateBookmark(UpdateBookmarkViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(vm.Id, vm.Title);
        }
        [Route("deletebookmark")]
        [HttpPost]
        [Authorize]
        public void DeleteBookmark(UpdateBookmarkViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(vm.Id);
        }

    }
}
