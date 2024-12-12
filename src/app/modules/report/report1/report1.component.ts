import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { PassingdataService } from 'src/app/services/passingdata.service';
import { Constant } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}
@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})

export class Report1Component implements OnInit {

  UrlBase:string;
  UrlChild:string
  Usuario:string;
  Uid:string;
  Sucursal:string;
  Agencia :string;
  Multiagencia:string;
  ipAddress:string;

  localIp = sessionStorage.getItem('LOCAL_IP');

  ipRegex = new RegExp(
    /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
  );

  constructor(private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private passingdata: PassingdataService ,
    private router:Router,
    private toastr:ToastrService,
    private http:HttpClient,
    config:ConfigService,
    ) {
    
      this.UrlBase=config.getConfig().phpSiteUrl;
      this.getIPAddress();
    }

  ngOnInit() {

    if (typeof(Constant.AUTH.getAgency()?.vus_codage)=='undefined'){
      this.toastr.warning('Debe seleccionar una agencia');
      this.router.navigate(['/']);
    }

    this.determineLocalIp();
    //this.getip()
    //this.UrlBase=environment.phpSiteUrl;
    this.UrlChild=this.passingdata.GetUrl();
    this.UrlChild= this.UrlChild.substring(2,this.UrlChild.length);
    this.Usuario  = "?usuario="+ Constant.AUTH.getUser()?.email;
    this.Sucursal= "&sucursal="+ Constant.AUTH.getAgency()?.vus_codins;
    this.Agencia ="&agencia=" + Constant.AUTH.getAgency()?.vus_codage;
    this.Uid="&uid="+ Constant.AUTH.getUser()?.id;
    this.Multiagencia="&ca="+ (Constant.AUTH.getUser()?.agencies.length>1?'S':'N');
    this.ipAddress=this.getIPAddress();
    this.ipAddress="&vars={ip:"+this.ipAddress+",usuario:"+Constant.AUTH.getUser()?.email+
    ",sucursal:"+Constant.AUTH.getAgency()?.vus_codins+",agencia:"+ Constant.AUTH.getAgency()?.vus_codage+
    ",uid:"+Constant.AUTH.getUser()?.id+",ca:"+(Constant.AUTH.getUser()?.agencies.length>1?'S':'N')+"}"
  }

  getUrl()
  {
    console.log(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia+this.ipAddress)
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.UrlBase+this.UrlChild+this.Usuario+this.Sucursal+this.Agencia+this.Uid+this.Multiagencia+this.ipAddress);
  }
  getIPAddress():string
  {
    let ip:string="";
    this.http.get("https://api-bdc.net/data/client-ip").subscribe((res:any)=>
      {
        ip=res.ipString
                localStorage.setItem("IpClient",ip);
      }
    );
    ip=localStorage.getItem("IpClient")||"";
    console.log(ip)
    let currentUrl =  document.location.hostname;
  console.log(currentUrl);
    return ip;
  }

  private determineLocalIp() {
    window.RTCPeerConnection = this.getRTCPeerConnection();

    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.createOffer().then(pc.setLocalDescription.bind(pc));

    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }
        
        var res=this.ipRegex.exec(ice.candidate.candidate)||'';
        //.log(this.ipRegex.exec(ice.candidate.candidate))
        console.log(this.localIp = res[1]);
        //sessionStorage.setItem('LOCAL_IP', this.localIp);

        pc.onicecandidate = () => {};
        pc.close();
      });
    };
  }

  private getRTCPeerConnection() {
    return (
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection
    );
  }

}
