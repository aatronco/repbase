import zipfile,xml.etree.ElementTree as E,json,hashlib,re,pathlib
import sys
p=pathlib.Path(sys.argv[1]);root=pathlib.Path(__file__).resolve().parent.parent;z=zipfile.ZipFile(p);ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
ss=[''.join(n.itertext()) for n in E.fromstring(z.read('xl/sharedStrings.xml')).findall('s:si',ns)]
cells={};cached={}
for c in E.fromstring(z.read('xl/worksheets/sheet8.xml')).findall('.//s:c',ns):
 v=c.find('s:v',ns);f=c.find('s:f',ns)
 if v is None and f is None:continue
 val=ss[int(v.text)] if v is not None and c.get('t')=='s' else ((v.text if c.get('t') in ['str','e'] else float(v.text)) if v is not None and v.text is not None else None)
 cached[c.get('r')]=val;cells[c.get('r')]='='+f.text if f is not None else val
maxes={'E4':'Sentadilla','E5':'Press banca','E6':'Peso muerto','E7':'Press militar','O4':'Press inclinado','O5':'Sentadilla frontal','AI4':'Sentadilla','AI5':'Press banca','AI6':'Peso muerto','AI7':'Press militar','AS4':'Press inclinado','AS5':'Sentadilla frontal'}
def col(n):
 s=''
 while n:n,a=divmod(n-1,26);s=chr(65+a)+s
 return s
def resolve(a):
 v=cells.get(a)
 return resolve(v[1:]) if isinstance(v,str) and re.fullmatch('=[A-Z]+[0-9]+',v) else v
workouts=[]
for week in range(1,13):
 c=4+(week-1)*5
 for day,(start,end) in enumerate([(57,66),(69,78),(81,90),(93,104)],1):
  entries=[];notes=[]
  for row in range(start,end+1):
   at=col(c)+str(row);name=resolve(at);weight=cells.get(col(c+1)+str(row));reps=cells.get(col(c+2)+str(row));sets=cells.get(col(c+3)+str(row));tier=cells.get(('C' if week<7 else 'AG')+str(row))
   if not name or name in ['RM:','AMRAP:','1RM:','MRS:']:continue
   if isinstance(name,str) and ('Rest' in name or 'Option' in name):notes.append(name);continue
   if weight is None and sets is None:continue
   item={'id':at,'tier':str(tier),'exercise':name,'reps':reps,'sets':sets,'source':at,'weightSource':col(c+1)+str(row)}
   if isinstance(weight,str) and weight.startswith('=MROUND'):
    m=re.fullmatch(r'=MROUND\(\$([A-Z]+)\$(\d+)\*([A-Z]+\d+),2.5\)',weight);assert m,weight
    item.update(kind='tm',maxCell=m[1]+m[2],percent=resolve(m[3]),formula=weight,expectedExample=cached[item['weightSource']])
   elif isinstance(weight,str) and weight.startswith('Find '):
    item.update(kind='rm',rm=int(re.search(r'\d+',weight)[0]))
    backRow=row+1;backWeight=cells.get(col(c+1)+str(backRow));backReps=cells.get(col(c+2)+str(backRow));backSets=cells.get(col(c+3)+str(backRow))
    if isinstance(backWeight,str) and backWeight.startswith('=MROUND'):
     m=re.fullmatch(r'=MROUND\(\$([A-Z]+)\$(\d+)\*([A-Z]+\d+),2.5\)',backWeight);item['backoff']={'kind':'tm','maxCell':m[1]+m[2],'percent':resolve(m[3]),'reps':backReps,'sets':backSets,'formula':backWeight,'source':col(c+1)+str(backRow),'expectedExample':cached[col(c+1)+str(backRow)]}
    elif isinstance(backWeight,(int,float)) and backReps and backSets:item['backoff']={'kind':'daily','percent':backWeight,'reps':backReps,'sets':backSets,'source':col(c+1)+str(backRow)}
   elif weight=='?':item.update(kind='mrs',rm=int(reps))
   else:continue
   entries.append(item)
  workouts.append({'week':week,'day':day,'entries':entries,'notes':notes})
# Expected example values kept only in test fixture, never application defaults.
fixture=[]
for w in workouts:
 for e in w['entries']:
  for v in [e,e.get('backoff',{})]:
   if 'expectedExample' in v:fixture.append({'week':w['week'],'day':w['day'],'id':e['id'],'backoff':v is not e,'expected':v.pop('expectedExample')})
metadata={'sheet':'J&T2.0 KGS','workbook':'Copy of Copy of GZCL Free Compendium November 27th Update','url':'https://docs.google.com/spreadsheets/d/14ke22ZVdepbuSPrOI2ssNbxll9T8utr4co7OVv9W6oI/edit','exportedAt':'2026-11-01','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'maxes':[{'cell':k,'label':v,'block':1 if k[0] in 'EO' else 2} for k,v in maxes.items()]}
(root/'js/program-data.js').write_text('export const source = '+json.dumps(metadata,ensure_ascii=False)+';\nexport const workouts = '+json.dumps(workouts,ensure_ascii=False,indent=2)+';\n')
for k in maxes:cells[k]=None
for k in list(cells):
 if re.search(r'1[12]$',k) and int(re.search(r'\d+',k)[0]) in [11,12]:del cells[k]
(root/'source/jt-kgs-cells.json').write_text(json.dumps({'metadata':metadata,'cells':cells},ensure_ascii=False,indent=2))
(root/'tests/excel-fixture.json').write_text(json.dumps({'maxes':{k:cached[k] for k in maxes},'loads':fixture},indent=2))
print('Extracted',len(workouts),'sessions,',sum(len(w['entries']) for w in workouts),'exercise prescriptions;',len(fixture),'formula controls')
