class PageViewModel {
	data: object[];
	page: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;

	constructor(data, totalCount, page, pageSize) {
  	this.data = data;
  	this.page = page;
  	this.pageSize = pageSize;
  	this.totalCount = totalCount;
  	this.totalPages = Math.ceil(totalCount/ pageSize);
	}
}

export default PageViewModel;
