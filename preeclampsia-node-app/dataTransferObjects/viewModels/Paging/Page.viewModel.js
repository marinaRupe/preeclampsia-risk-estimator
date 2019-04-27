class PageViewModel {
  constructor(data, totalCount, page, pageSize) {
    this.data= data;
    this.page = page;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount/ pageSize);
  }
}

module.exports = PageViewModel;
