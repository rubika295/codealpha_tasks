from scapy.all import sniff, conf
from scapy.layers.inet import IP, TCP, UDP, ICMP
from scapy.layers.l2 import ARP, Ether
from datetime import datetime
def get_protocol(pkt):
    if pkt.haslayer(TCP):
        return "TCP"
    elif pkt.haslayer(UDP):
        return "UDP"
    elif pkt.haslayer(ICMP):
        return "ICMP"
    elif pkt.haslayer(ARP):
        return "ARP"
    return "OTHER"
def get_payload(pkt):
    try:
        raw = bytes(pkt[TCP].payload) if pkt.haslayer(TCP) else bytes(pkt[UDP].payload)
        text = "".join(c for c in raw.decode("utf-8", errors="replace") if c.isprintable()).strip()
        return text[:80] if text else None
    except Exception:
        return None
def process_packet(pkt):
    timestamp = datetime.now().strftime("%H:%M:%S")
    protocol = get_protocol(pkt)
    if pkt.haslayer(ARP):
        arp = pkt[ARP]
        op = "Request" if arp.op == 1 else "Reply"
        print(f"[{timestamp}] ARP {op:7} | {arp.psrc:15} -> {arp.pdst}")
        return
    if not pkt.haslayer(IP):
        return
    ip = pkt[IP]
    src, dst = ip.src, ip.dst
    if pkt.haslayer(TCP) or pkt.haslayer(UDP):
        layer = pkt[TCP] if pkt.haslayer(TCP) else pkt[UDP]
        sport, dport = layer.sport, layer.dport
        print(f"[{timestamp}] {protocol:5} | {src:15}:{sport:<5} -> {dst:15}:{dport:<5}", end="")
    else:
        print(f"[{timestamp}] {protocol:5} | {src:15}        -> {dst:15}      ", end="")

    payload = get_payload(pkt) if protocol in ("TCP", "UDP") else None
    print(f" | Payload: {payload}" if payload else "")
def main():
    print("=" * 70)
    print("           NETWORK SNIFFER - Capture & Analyze Packets")
    print("=" * 70)
    print(f"{'Time':10} {'Proto':5} | {'Source':21} -> {'Destination':21} | Payload")
    print("-" * 70)

    iface = conf.iface
    print(f"[*] Sniffing on interface: {iface}")
    print("[*] Press Ctrl+C to stop.\n")
    try:
        sniff(iface=iface, prn=process_packet, store=False)
    except KeyboardInterrupt:
        print("\n[*] Sniffing stopped.")
    except PermissionError:
        print("[!] Permission denied. Run as Administrator.")
if __name__ == "__main__":
    main()
