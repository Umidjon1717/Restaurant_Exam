import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../user/dto/query_filer.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }


  @Get()
  @ApiQuery({ name: 'filter', required: false, description: 'Filter by name' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Order of sorting' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
  findAll(@Query() query: QueryDto) {
    console.log('Received query:', query);

    const { filter, order, page, limit } = query;

    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    console.log('Converted pageNum:', pageNum);
    console.log('Converted limitNum:', limitNum);
    return this.menuService.findAll({ filter, order, page: pageNum, limit: limitNum });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
