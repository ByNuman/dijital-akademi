import json
import os
import re

def process_calendar():
    try:
        with open('src/data/extracted/calendar_tables.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        events = []
        for table in data:
            for row in table:
                # Typically row[0] is title, row[3] is date
                # Let's just extract any string that looks like a date and the longest string as title
                strings = [str(x).strip() for x in row if x and str(x).strip() != '']
                if len(strings) >= 2:
                    title = strings[0]
                    # date is usually the last one or the one containing numbers
                    date_str = strings[-1]
                    if len(title) > 5 and len(date_str) > 3:
                        events.append({
                            "id": len(events) + 1,
                            "title": title.replace('\n', ' '),
                            "date": date_str.replace('\n', ' '),
                            "type": "academic"
                        })
        
        with open('src/data/calendar.json', 'w', encoding='utf-8') as f:
            json.dump(events, f, indent=2, ensure_ascii=False)
        print(f"Processed calendar: {len(events)} events")
    except Exception as e:
        print("Error processing calendar:", e)

def process_courses():
    try:
        with open('src/data/extracted/courses_tables.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        courses = []
        for table in data:
            for row in table:
                strings = [str(x).replace('\n', ' ').strip() for x in row if x and str(x).strip() != '']
                if len(strings) >= 3:
                    time = strings[0] if ':' in strings[0] or '.' in strings[0] else ""
                    if not time and len(strings) > 1 and (':' in strings[1] or '.' in strings[1]):
                        time = strings[1]
                    title = strings[-1]
                    if len(title) > 3 and not title.isdigit():
                        courses.append({
                            "id": len(courses) + 1,
                            "title": title,
                            "time": time,
                            "instructor": "Belirtilmemiş"
                        })
        
        # simple deduplication
        unique_courses = []
        seen = set()
        for c in courses:
            if c["title"] not in seen:
                seen.add(c["title"])
                unique_courses.append(c)

        with open('src/data/courses.json', 'w', encoding='utf-8') as f:
            json.dump(unique_courses[:50], f, indent=2, ensure_ascii=False) # max 50
        print(f"Processed courses: {len(unique_courses)} distinct courses")
    except Exception as e:
        print("Error processing courses:", e)

def process_exams():
    try:
        with open('src/data/extracted/exams_tables.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        exams = []
        for table in data:
            for row in table:
                strings = [str(x).replace('\n', ' ').strip() for x in row if x and str(x).strip() != '']
                if len(strings) >= 2:
                    ex = strings[-1]
                    if len(ex) > 5:
                        exams.append({
                            "id": len(exams) + 1,
                            "title": ex,
                            "date": "TBD"
                        })
        
        # simple deduplication
        unique_exams = []
        seen = set()
        for c in exams:
            if c["title"] not in seen:
                seen.add(c["title"])
                unique_exams.append(c)

        with open('src/data/exams.json', 'w', encoding='utf-8') as f:
            json.dump(unique_exams[:50], f, indent=2, ensure_ascii=False)
        print(f"Processed exams: {len(unique_exams)} distinct exams")
    except Exception as e:
        print("Error processing exams:", e)

if __name__ == "__main__":
    process_calendar()
    process_courses()
    process_exams()
