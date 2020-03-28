import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChildrenSong } from './children-song.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express'
import { Repository } from 'typeorm';
import { ConfigService } from "@nestjs/config";
import * as qiniu from 'qiniu'
@Controller('childrenSong')
export class ChildrenSongController {
    constructor(
        @InjectRepository(ChildrenSong)
        private readonly childrenSongRepo: Repository<ChildrenSong>,
        private readonly configService: ConfigService
    ) { }
    @Get()
    async get() {
        // 获取儿歌
        const res = await this.childrenSongRepo.find()
        const ak = this.configService.get("qiniu").ak
        const sk = this.configService.get("qiniu").sk
        const mac = new qiniu.auth.digest.Mac(ak, sk);
        const Ddmain = this.configService.get("qiniu").Domain
        var config = new qiniu.conf.Config();
        config['bucket'] = this.configService.get("qiniu").bucket
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        var deadline = parseInt(`${Date.now() / 1000}`) + 3600; // 1小时过期
        return {
            code: 0,
            data: res.map(ele => {
                ele['adress'] = bucketManager.privateDownloadUrl(Ddmain, ele.key, deadline);
                return ele
            })
        }
    }

    @Post()
    async create(@Body() body) {
        // 创建儿歌
        const res = await this.childrenSongRepo.save(body)
        return {
            code: 0,
            data: res
        }
    }

    @Put('/:id')
    async update(@Param() id: number, @Body() body) {
        // 更新儿歌
        const res = this.childrenSongRepo.update(id, body)
        return {
            code: 0,
            data: res
        }
    }

    @Delete('/:id')
    async delete(@Param() id: number) {
        // 删除儿歌
        const res = this.childrenSongRepo.delete(id)
        return {
            code: 0,
            data: res
        }
    }
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file) {
        // 上传文件
        const ak = this.configService.get("qiniu").ak
        const sk = this.configService.get("qiniu").sk
        const bucket = this.configService.get("qiniu").bucket
        var mac = new qiniu.auth.digest.Mac(ak, sk);
        const options = {
            scope: bucket,
        }
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);

        var config = new qiniu.conf.Config({
            ...this.configService.get("qiniu"),
            zone: qiniu.zone.Zone_z0
        });
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        const res = await new Promise((resolve, reject) => {
            formUploader.put(uploadToken, file.originalname, file.buffer, putExtra, function (respErr,
                respBody, respInfo) {
                if (respErr) {
                    reject(respErr)
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody)
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            });
        })

        return {
            code: 0,
            data: res
        }

    }
}
