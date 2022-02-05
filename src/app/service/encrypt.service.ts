import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as JsEncryptModule from 'jsencrypt';
import { URLS } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor(private http: _HttpClient) {}
  encryptRule: any;

  /**
   * 加密请求总入口
   * @param http http客户端
   * @param originaData  原始数据
   * @returns 返回解密后的数据
   */
  encrypt(originaData) {
    return new Promise(resolve => {
      if (this.encryptRule === undefined || this.encryptRule === null) {
        this.http.get(URLS.encryptRule.url).subscribe((resp: any) => {
          if (resp.status === 0) {
            this.encryptRule = resp;
            resolve(this.executeEncrypt(this.encryptRule, originaData));
          }
        });
      } else {
        resolve(this.executeEncrypt(this.encryptRule, originaData));
      }
    });
  }

  /**
   * 根据加密规则和原始数据返回加密后的数据
   * @param encryptRule 加密的规则
   * @param originaData 原始数据
   */
  executeEncrypt(encryptRule, originaData) {
    // 加密类型
    let encryptType = encryptRule.data.encrypt.toLowerCase();
    let encryptData;
    // 不需要加密
    if (encryptType === 'needless') {
      encryptData = originaData;
      // rsa加密
    } else if (encryptType === 'rsa') {
      encryptData = this.rsaEncrypt(encryptRule.data.ruleKey, originaData);
    }

    return encryptData;
  }

  /**
   * RSA加密
   * @param publicKey 公钥
   * @param data   加密的数据
   */
  rsaEncrypt(publicKey, data) {
    let encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    let enc_by_pub = this.encryptDataFormat(encrypt.encrypt(data));
    return enc_by_pub;
  }

  /**
   * 与后端约定的加密后的格式包装
   * @param data
   */
  encryptDataFormat(data) {
    return 'ENC(' + data + ')';
  }

  /**
   * 清空加密规则
   */
  clearEncryptRule() {
    this.encryptRule = null;
    return;
  }
}
