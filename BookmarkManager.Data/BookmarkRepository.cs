using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookmarkManager.Data
{
    public class BookmarkRepository
    {
        private string _connectionString;
        public BookmarkRepository(string conn)
        {
            _connectionString = conn;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }
        public void DeleteBookmark(int id)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Remove(context.Bookmarks.FirstOrDefault(b => b.Id == id));
            context.SaveChanges();
        }
        public void UpdateBookmark(int id, string title)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title={title} WHERE ID={id}");

        }
        public List<BookmarkCount> GetPopularBookmarks()
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Bookmarks.GroupBy(b => b.Url).Select(u => new BookmarkCount
            {
                Url = u.Key,
                Count = u.Count()
            })
                .OrderByDescending(u => u.Count)
                   .Take(5)
                   .ToList();
        }

        public List<Bookmark> GetMyBookmarks(int userId)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
    }
}
